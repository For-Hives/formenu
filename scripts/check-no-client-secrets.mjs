/*
 * Guard against the return of the "Strapi user records in the public HTML" leak.
 *
 *   npm run check:leak        (also runs before every `npm run build`)
 *
 * Plain Node, no dependency, nothing is fetched. It fails when:
 * 1. a file references NEXT_PUBLIC_API_TOKEN, or any NEXT_PUBLIC_ variable whose
 *    name says it is a credential: Next.js writes NEXT_PUBLIC_ variables into
 *    the JavaScript sent to browsers;
 * 2. src/services/getData.js is not guarded by `import 'server-only'`, a file
 *    reads API_TOKEN without that guard, a guarded file reads an environment
 *    variable otherwise than as process.env.NAME (a computed name would hide a
 *    public variable from point 1), or a 'use client' file imports a guarded
 *    module (directly or through other modules);
 * 3. the whitelist mappers let anything from a poisoned API payload through.
 *
 * All the data below is fake.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src')
const GET_DATA = join(SRC, 'services', 'getData.js')
const MAPPERS = join(SRC, 'services', 'menuMappers.js')
const ALLERGENS = join(SRC, 'enum', 'allergensData.js')
// where a credential must never be exposed under a NEXT_PUBLIC_ name
const SCANNED = ['src', 'config', '.bruno', 'next.config.js', '.env.exemple']
const CODE_EXTENSIONS = ['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx']

const errors = []
const fail = message => errors.push(message)
const rel = file => relative(ROOT, file)

function walk(path) {
	if (!existsSync(path)) return []
	if (!statSync(path).isDirectory()) return [path]
	return readdirSync(path).flatMap(name => walk(join(path, name)))
}

const isCode = file => CODE_EXTENSIONS.some(ext => file.endsWith(ext))
const read = file => readFileSync(file, 'utf8')

// ---------------------------------------------------------------------------
// 1. no credential behind a NEXT_PUBLIC_ variable
// ---------------------------------------------------------------------------
const PUBLIC_CREDENTIAL =
	/NEXT_PUBLIC_API_TOKEN|NEXT_PUBLIC_[A-Z0-9_]*(?:TOKEN|SECRET|PASSWORD)[A-Z0-9_]*/

SCANNED.flatMap(entry => walk(join(ROOT, entry))).forEach(file => {
	if (/\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf)$/i.test(file)) return
	read(file)
		.split('\n')
		.forEach((line, index) => {
			const match = line.match(PUBLIC_CREDENTIAL)
			if (match) {
				fail(
					`${rel(file)}:${index + 1} references ${match[0]}: a NEXT_PUBLIC_ variable is public, use the server-only API_TOKEN from src/services/getData.js`
				)
			}
		})
})

// ---------------------------------------------------------------------------
// 2. the modules holding the credential stay on the server
// ---------------------------------------------------------------------------
// (the line breaks are kept, for the line numbers of the messages)
const stripComments = code =>
	code
		.replace(/\/\*[\s\S]*?\*\//g, comment => comment.replace(/[^\n]/g, ''))
		.replace(/^[ \t]*\/\/.*$/gm, '')

const isClientModule = code =>
	/^\s*(['"])use client\1/.test(stripComments(code))

const isServerOnly = code =>
	/^\s*import\s+(['"])server-only\1/m.test(stripComments(code))

function importsOf(file, code) {
	const specifiers = []
	const pattern =
		/(?:\bimport|\bexport)\s+(?:[^'"]*?\bfrom\s*)?(['"])([^'"]+)\1|\b(?:import|require)\s*\(\s*(['"])([^'"]+)\3\s*\)/g
	for (const match of stripComments(code).matchAll(pattern)) {
		specifiers.push(match[2] ?? match[4])
	}
	return specifiers
		.map(specifier => {
			let base
			if (specifier.startsWith('@/')) base = join(SRC, specifier.slice(2))
			else if (specifier.startsWith('.'))
				base = resolve(dirname(file), specifier)
			else return null // a package
			const candidates = [
				base,
				...CODE_EXTENSIONS.map(ext => base + ext),
				...CODE_EXTENSIONS.map(ext => join(base, 'index' + ext)),
			]
			return candidates.find(
				candidate => existsSync(candidate) && statSync(candidate).isFile()
			)
		})
		.filter(Boolean)
}

const sources = new Map(
	[...walk(SRC), ...walk(join(ROOT, 'config'))]
		.filter(isCode)
		.map(file => [file, read(file)])
)

if (!sources.has(GET_DATA)) {
	fail(`${rel(GET_DATA)} is missing: update this check if the service moved`)
} else if (!isServerOnly(sources.get(GET_DATA))) {
	fail(
		`${rel(GET_DATA)} must start with \`import 'server-only'\`: it holds the API credential and raw API data`
	)
}

// `process` followed by anything else than `.env.NAME`
const DYNAMIC_ENV_ACCESS = /\bprocess\b(?!\s*\.\s*env\s*\.\s*[A-Za-z_$][\w$]*)/g

for (const [file, code] of sources) {
	const readsToken = /process\.env\.API_TOKEN\b/.test(code)
	if (readsToken && !isServerOnly(code)) {
		fail(
			`${rel(file)} reads process.env.API_TOKEN without \`import 'server-only'\``
		)
	}
	if (!readsToken && !isServerOnly(code)) continue
	// Where the credential lives, the name of every environment variable must be
	// written in full: process.env['NEXT_PUBLIC_' + name], an alias of
	// process.env or a destructuring could read a public variable without
	// check 1 seeing its name.
	const stripped = stripComments(code)
	for (const match of stripped.matchAll(DYNAMIC_ENV_ACCESS)) {
		const line = stripped.slice(0, match.index).split('\n').length
		fail(
			`${rel(file)}:${line} uses \`process\` otherwise than as process.env.NAME: in a module holding the credential, write the name of each environment variable in full`
		)
	}
}

for (const [entry, code] of sources) {
	if (!isClientModule(code)) continue
	// every module reachable from a 'use client' file ends up in a browser bundle
	const seen = new Set([entry])
	const queue = [[entry]]
	while (queue.length) {
		const path = queue.shift()
		const file = path[path.length - 1]
		for (const imported of importsOf(file, sources.get(file) ?? read(file))) {
			if (seen.has(imported)) continue
			seen.add(imported)
			const next = [...path, imported]
			if (isServerOnly(sources.get(imported) ?? read(imported))) {
				fail(
					`'use client' file imports a server-only module: ${next
						.map(rel)
						.join(
							' -> '
						)}. Load the data in a server component and pass it as props`
				)
			} else {
				queue.push(next)
			}
		}
	}
}

// ---------------------------------------------------------------------------
// 3. the mappers only let whitelisted properties through
// ---------------------------------------------------------------------------
// The two modules have no import: load them from their source, whatever the
// module type Node would guess for a .js file of this package.
const load = file =>
	import(
		`data:text/javascript;base64,${Buffer.from(read(file)).toString('base64')}`
	)

const CANARY = 'CANARY_USER_RECORD_DO_NOT_SHIP'
const FORBIDDEN_KEYS = [
	'company',
	'users',
	'user',
	'password',
	'resetPasswordToken',
	'confirmationToken',
	'email',
	'username',
	'firstname',
	'lastname',
	'phoneNumber',
	'provider',
	'related',
	'createdBy',
	'updatedBy',
	'suscribe_date_start',
	'suscribe_date_end',
]

const fakeUser = () => ({
	id: 901,
	username: `${CANARY}_username`,
	email: 'canary.owner@example.com',
	provider: 'local',
	password: `$2a$10$${CANARY}`,
	resetPasswordToken: `${CANARY}_reset`,
	confirmationToken: `${CANARY}_confirm`,
	confirmed: true,
	blocked: false,
	firstname: `${CANARY}_firstname`,
	lastname: `${CANARY}_lastname`,
	phoneNumber: '+33 0 00 00 00 00',
})

const fakeRawCompany = () => ({
	id: 77,
	name: `${CANARY}_company`,
	street: `${CANARY}_street`,
	suscribe_date_start: '2020-01-01',
	suscribe_date_end: '2099-01-01',
	users: [fakeUser(), fakeUser()],
})

/** What the API has been seen to add, on every object of the payload */
function poison(value) {
	if (Array.isArray(value)) return value.map(poison)
	if (value === null || typeof value !== 'object') return value
	const poisoned = {}
	for (const [key, child] of Object.entries(value))
		poisoned[key] = poison(child)
	return {
		...poisoned,
		company: fakeRawCompany(),
		users: [fakeUser()],
		related: [{ __type: 'plugin::users-permissions.user', ...fakeUser() }],
		createdBy: fakeUser(),
		updatedBy: fakeUser(),
		password: `$2a$10$${CANARY}`,
		resetPasswordToken: `${CANARY}_reset`,
		[`${CANARY}_unknown_key`]: fakeUser(),
	}
}

/** A raw object where a text or a number is expected */
function poisonScalars(value) {
	if (Array.isArray(value)) return value.map(poisonScalars)
	if (value === null || typeof value !== 'object') {
		return typeof value === 'boolean' ? value : fakeRawCompany()
	}
	const poisoned = {}
	for (const [key, child] of Object.entries(value)) {
		poisoned[key] = poisonScalars(child)
	}
	return poisoned
}

function collectObjects(value, found = new Set()) {
	if (value === null || typeof value !== 'object' || found.has(value)) {
		return found
	}
	found.add(value)
	Object.values(value).forEach(child => collectObjects(child, found))
	return found
}

function collectKeys(value, found = new Set()) {
	if (value === null || typeof value !== 'object') return found
	for (const [key, child] of Object.entries(value)) {
		if (!Array.isArray(value)) found.add(key)
		collectKeys(child, found)
	}
	return found
}

function expectClean(label, input, output) {
	const text = JSON.stringify(output)
	if (text.includes(CANARY) || text.includes('@example.com')) {
		fail(`${label}: a poisoned value of the payload reached the output`)
	}
	const keys = collectKeys(output)
	FORBIDDEN_KEYS.filter(key => keys.has(key)).forEach(key => {
		fail(`${label}: the output contains a "${key}" key`)
	})
	const raw = collectObjects(input)
	if ([...collectObjects(output)].some(object => raw.has(object))) {
		fail(
			`${label}: an object of the API response is forwarded by reference, rebuild it key by key`
		)
	}
}

const media = url => ({
	id: 5,
	name: 'file.svg',
	alternativeText: null,
	url,
	formats: { thumbnail: { url: `${url}?thumbnail` } },
	folderPath: '/1',
})

const ingredient = (id, name) => ({
	id,
	name,
	activated: true,
	available_date_start: null,
	available_date_end: null,
	locale: 'fr',
	dishes: [{ id: 1, name: 'another dish', activated: false }],
})

const { ALLERGEN_KEYS, mapAllCompanyPayload, mapContentWebsitePayload } =
	await load(MAPPERS)
const { allergens } = await load(ALLERGENS)

if (
	JSON.stringify([...ALLERGEN_KEYS].sort()) !==
	JSON.stringify(allergens.map(allergen => allergen.key).sort())
) {
	fail(
		`${rel(MAPPERS)}: ALLERGEN_KEYS and ${rel(ALLERGENS)} do not list the same allergens`
	)
}

const dish = {
	id: 31,
	name: 'Fake dish',
	description: 'Fake description',
	price: 12.5,
	activated: true,
	available_date_start: null,
	available_date_end: null,
	createdAt: '2026-01-01T00:00:00.000Z',
	updatedAt: '2026-01-02T00:00:00.000Z',
	...Object.fromEntries(ALLERGEN_KEYS.map(key => [key, true])),
	is_vegetarian: true,
	is_vegan: false,
	is_pescetarian: false,
	is_sidedish: false,
	image: media('https://media.example.org/dish.jpg'),
	type_dish: {
		id: 2,
		name: 'Starter',
		color: 'red-500',
		icon: media('https://media.example.org/type.svg'),
	},
	ingredients: [ingredient(41, 'Fake ingredient')],
	dishes: [
		{
			id: 32,
			name: 'Fake option',
			activated: true,
			available_date_start: null,
			available_date_end: null,
			is_allergen_gluten: true,
			is_vegetarian: true,
			is_vegan: true,
			is_pescetarian: true,
			is_sidedish: true,
			ingredients: [ingredient(42, 'Fake option ingredient')],
		},
	],
}

const allCompany = [
	{
		id: 1,
		name: 'Fake restaurant',
		country: 'France',
		city: 'Fakeville',
		street: '1 fake street',
		postcode: 12345,
		slug: 'fake-restaurant',
		color: 'blue',
		fonts: 'lato',
		fonts_title: 'fraunces',
		activated: true,
		suscribe_date_start: '2020-01-01',
		suscribe_date_end: '2099-01-01',
		content: {
			id: 3,
			metadata_title: 'Fake title',
			metadata_description: 'Fake description',
			home_title: 'Fake home title',
			home_subtitle: 'Fake home subtitle',
			home_image: media('https://media.example.org/logo.svg'),
			home_background_images: [
				media('https://media.example.org/bg1.jpg'),
				media('https://media.example.org/bg2.jpg'),
			],
		},
		menus: [
			{
				id: 11,
				title: 'Fake menu',
				description: 'Fake menu description',
				activated: true,
				available_date_start: null,
				available_date_end: null,
				color: 'blue',
				fonts: 'lato',
				image: media('https://media.example.org/menu.jpg'),
				categories: [
					{
						id: 21,
						name: 'Fake parent category',
						locale: 'fr',
						depth: 0,
						order: 0,
						icon: media('https://media.example.org/parent.svg'),
						category: null,
						categories: [
							{
								id: 22,
								name: 'Fake child category',
								depth: 1,
								order: 0,
								icon: media('https://media.example.org/child.svg'),
							},
						],
						dishes: [],
					},
					{
						id: 22,
						name: 'Fake child category',
						locale: 'fr',
						depth: 1,
						order: 0,
						icon: media('https://media.example.org/child.svg'),
						category: { id: 21, name: 'Fake parent category', depth: 0 },
						categories: [],
						dishes: [dish],
					},
				],
			},
		],
	},
]

const contentWebsite = {
	data: {
		id: 1,
		attributes: {
			createdAt: '2026-01-01T00:00:00.000Z',
			content: {
				id: 1,
				metadata_title: 'Fake title',
				metadata_description: 'Fake description',
				home_title: 'Fake home title',
				home_subtitle: 'Fake home subtitle',
				home_image: {
					data: { id: 5, attributes: media('https://media.example.org/a.svg') },
				},
				home_background_images: {
					data: [
						{ id: 6, attributes: media('https://media.example.org/b.jpg') },
					],
				},
			},
		},
	},
}

// a payload poisoned on every object, then one with objects in place of values
for (const [label, transform] of [
	['poisoned payload', poison],
	['payload with objects in place of values', poisonScalars],
]) {
	const rawAllCompany = transform(allCompany)
	expectClean(
		`mapAllCompanyPayload, ${label}`,
		rawAllCompany,
		mapAllCompanyPayload(rawAllCompany)
	)
	const rawContentWebsite = transform(contentWebsite)
	expectClean(
		`mapContentWebsitePayload, ${label}`,
		rawContentWebsite,
		mapContentWebsitePayload(rawContentWebsite)
	)
}

// and the mappers still return what the UI needs
const mapped = mapAllCompanyPayload(poison(allCompany))
const mappedDish = mapped.dishes[0]
const expectations = [
	[mapped.companies.length, 1],
	[mapped.menus.length, 1],
	[mapped.categories.length, 2],
	[mapped.dishes.length, 1],
	[mapped.companies[0]?.slug, 'fake-restaurant'],
	[mapped.companies[0]?.home_image?.url, 'https://media.example.org/logo.svg'],
	[mapped.companies[0]?.home_background_images?.length, 2],
	[mapped.categories[0]?.categories?.[0]?.name, 'Fake child category'],
	[mapped.categories[0]?.icon?.url, 'https://media.example.org/parent.svg'],
	[mapAllCompanyPayload(poison(allCompany), 1).dishes.length, 1],
	[mapAllCompanyPayload(poison(allCompany), '1').companies.length, 1],
	[mapAllCompanyPayload(poison(allCompany), 2).companies.length, 0],
	[mapAllCompanyPayload(poison(allCompany), 2).dishes.length, 0],
	[mappedDish?.name, 'Fake dish'],
	[mappedDish?.price, 12.5],
	[mappedDish?.available_date_start, null],
	[mappedDish?.image?.url, 'https://media.example.org/dish.jpg'],
	[mappedDish?.type_dish?.icon?.url, 'https://media.example.org/type.svg'],
	[mappedDish?.type_dish?.color, 'red-500'],
	[mappedDish?.ingredients?.[0]?.name, 'Fake ingredient'],
	[mappedDish?.dishes?.[0]?.name, 'Fake option'],
	[mappedDish?.dishes?.[0]?.ingredients?.[0]?.name, 'Fake option ingredient'],
	[mappedDish?.dishes?.[0]?.allergens?.is_allergen_gluten, true],
	[ALLERGEN_KEYS.every(key => mappedDish?.allergens?.[key] === true), true],
	[
		mapContentWebsitePayload(poison(contentWebsite)).home_background_images
			?.data?.[0]?.attributes?.url,
		'https://media.example.org/b.jpg',
	],
]
expectations.forEach(([actual, expected], index) => {
	if (actual !== expected) {
		fail(
			`mappers: expectation #${index + 1} failed, got ${JSON.stringify(actual)} instead of ${JSON.stringify(expected)}`
		)
	}
})

// ---------------------------------------------------------------------------
if (errors.length) {
	console.error(`check:leak FAILED (${errors.length})`)
	errors.forEach(message => console.error(` - ${message}`))
	process.exit(1)
}
console.log(
	`check:leak OK: ${sources.size} source files, no public credential variable, no server-only module in a client bundle, mappers drop everything unknown`
)
