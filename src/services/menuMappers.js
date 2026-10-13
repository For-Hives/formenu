/*
 * Whitelist mappers for the Strapi payloads (/api/all-company and
 * /api/content-website).
 *
 * SECURITY: what these functions return is passed as props to 'use client'
 * components, and Next.js serialises those props into the public HTML. The
 * API used to send complete related rows (a company with its `users`,
 * password hashes included) and the old code forwarded them as they were.
 *
 * Rules, enforced by `npm run check:leak` (scripts/check-no-client-secrets.mjs):
 * - every object is rebuilt key by key: no spread, nothing forwarded by
 *   reference from the API response;
 * - every value goes through scalar() or one of the mappers below, so a nested
 *   object can never travel inside a whitelisted key;
 * - to expose a new field, add it here explicitly.
 *
 * Keep this file free of imports, env access and fetch: the check script loads
 * it with plain Node and runs it against a poisoned payload.
 */

/**
 * The allergens the UI can display and filter on.
 * Must stay in sync with src/enum/allergensData.js (verified by check:leak):
 * `is_allergen_shellfishes` was missing from the old mapping, so that allergen
 * was never displayed and its filter never excluded a dish.
 */
export const ALLERGEN_KEYS = [
	'is_allergen_gluten',
	'is_allergen_shellfishes',
	'is_allergen_eggs',
	'is_allergen_fishes',
	'is_allergen_peanuts',
	'is_allergen_soybeans',
	'is_allergen_milk',
	'is_allergen_nuts',
	'is_allergen_celery',
	'is_allergen_mustard',
	'is_allergen_sesams',
	'is_allergen_sulphurous_anhydre',
	'is_allergen_lupins',
	'is_allergen_mollusks',
]

/**
 * Keep a value only if it is a primitive (null and undefined are preserved,
 * the UI makes a difference between them). Objects and arrays are dropped.
 * @private
 */
function scalar(value) {
	const type = typeof value
	if (
		value === null ||
		type === 'string' ||
		type === 'number' ||
		type === 'boolean'
	) {
		return value
	}
	return undefined
}

/**
 * @private
 */
function list(value) {
	return Array.isArray(value) ? value : []
}

/**
 * @private
 */
function isRecord(value) {
	return value !== null && typeof value === 'object' && !Array.isArray(value)
}

/**
 * A media (image, icon): only its url is used by the UI.
 * @private
 * @returns {{url: (string|undefined)}|null}
 */
function mapMedia(media) {
	if (!isRecord(media)) return null
	return {
		url: typeof media.url === 'string' ? media.url : undefined,
	}
}

/**
 * @private
 */
function mapAllergens(dish) {
	const allergens = {}
	ALLERGEN_KEYS.forEach(key => {
		allergens[key] = scalar(dish?.[key])
	})
	return allergens
}

/**
 * The other dishes using the ingredient (`ingredient.dishes`) are not
 * forwarded. checkIfActivated() used to walk through them by accident, and hid
 * a dish as soon as another dish sharing one of its ingredients was disabled.
 * @private
 */
function mapIngredient(ingredient) {
	return {
		id: scalar(ingredient?.id),
		name: scalar(ingredient?.name),
		activated: scalar(ingredient?.activated),
		available_date_start: scalar(ingredient?.available_date_start),
		available_date_end: scalar(ingredient?.available_date_end),
	}
}

/**
 * @private
 */
function mapTypeDish(type_dish) {
	if (!isRecord(type_dish)) return null
	return {
		color: scalar(type_dish.color),
		icon: mapMedia(type_dish.icon),
	}
}

/**
 * A dish offered as an option of another dish.
 * @private
 */
function mapSubDish(subdish) {
	return {
		id: scalar(subdish?.id),
		name: scalar(subdish?.name),
		ingredients: list(subdish?.ingredients).map(mapIngredient),
		activated: scalar(subdish?.activated),
		available_date_start: scalar(subdish?.available_date_start),
		available_date_end: scalar(subdish?.available_date_end),
		allergens: mapAllergens(subdish),
		is_vegetarian: scalar(subdish?.is_vegetarian),
		is_vegan: scalar(subdish?.is_vegan),
		is_pescetarian: scalar(subdish?.is_pescetarian),
	}
}

/**
 * @private
 */
function mapDish(dish) {
	return {
		id: scalar(dish?.id),
		name: scalar(dish?.name),
		description: scalar(dish?.description),
		price: scalar(dish?.price),
		ingredients: list(dish?.ingredients).map(mapIngredient),
		image: mapMedia(dish?.image),
		type_dish: mapTypeDish(dish?.type_dish),
		activated: scalar(dish?.activated),
		available_date_start: scalar(dish?.available_date_start),
		available_date_end: scalar(dish?.available_date_end),
		createdAt: scalar(dish?.createdAt),
		allergens: mapAllergens(dish),
		dishes: list(dish?.dishes).map(mapSubDish),
		is_vegetarian: scalar(dish?.is_vegetarian),
		is_vegan: scalar(dish?.is_vegan),
		is_sidedish: scalar(dish?.is_sidedish),
		is_pescetarian: scalar(dish?.is_pescetarian),
	}
}

/**
 * A child category, as listed on the page of its parent.
 * @private
 */
function mapChildCategory(category) {
	return {
		id: scalar(category?.id),
		name: scalar(category?.name),
		icon: mapMedia(category?.icon),
	}
}

/**
 * The parent `category` sent by the API is not forwarded: nothing reads it.
 * @private
 */
function mapCategory(category) {
	return {
		id: scalar(category?.id),
		name: scalar(category?.name),
		order: scalar(category?.order),
		depth: scalar(category?.depth),
		icon: mapMedia(category?.icon),
		categories: list(category?.categories).map(mapChildCategory),
		dishes: list(category?.dishes).map(mapDish),
	}
}

/**
 * @private
 */
function mapMenu(menu) {
	return {
		id: scalar(menu?.id),
		title: scalar(menu?.title),
		description: scalar(menu?.description),
		activated: scalar(menu?.activated),
		available_date_start: scalar(menu?.available_date_start),
		available_date_end: scalar(menu?.available_date_end),
		color: scalar(menu?.color),
		fonts: scalar(menu?.fonts),
		image: mapMedia(menu?.image),
		categories: list(menu?.categories).map(mapCategory),
	}
}

/**
 * The menus are not attached to the company: they are returned next to it,
 * so that the company object given to the components stays small. For the
 * same reason no menu, category or dish carries a `company` key.
 * @private
 */
function mapCompany(record_company) {
	const content = record_company?.content
	return {
		id: scalar(record_company?.id),
		name: scalar(record_company?.name),
		slug: scalar(record_company?.slug),
		color: scalar(record_company?.color),
		fonts: scalar(record_company?.fonts),
		fonts_title: scalar(record_company?.fonts_title),
		metadata_title: scalar(content?.metadata_title),
		metadata_description: scalar(content?.metadata_description),
		home_title: scalar(content?.home_title),
		home_subtitle: scalar(content?.home_subtitle),
		home_image: mapMedia(content?.home_image),
		home_background_images: Array.isArray(content?.home_background_images)
			? content.home_background_images.map(mapMedia)
			: null,
	}
}

/**
 * Map the response of /api/all-company to flat lists of whitelisted objects.
 * @public
 * @param data raw API response (an array of companies)
 * @param company_id when given, only the data of this company is returned
 * @returns {{companies: *[], dishes: *[], menus: *[], categories: *[]}}
 */
export function mapAllCompanyPayload(data, company_id) {
	const companies = []
	const menus = []
	const categories = []
	const dishes = []

	list(data).forEach(record_company => {
		const company = mapCompany(record_company)
		if (company_id && String(company.id) !== String(company_id)) return

		companies.push(company)
		list(record_company?.menus).forEach(record_menu => {
			const menu = mapMenu(record_menu)
			menus.push(menu)
			menu.categories.forEach(category => {
				categories.push(category)
				category.dishes.forEach(dish => {
					dishes.push(dish)
				})
			})
		})
	})

	return {
		companies: companies,
		menus: menus,
		categories: categories,
		dishes: dishes,
	}
}

/**
 * A media in the REST format of Strapi: { data: { attributes: { url } } }
 * @private
 */
function mapRestMedia(media) {
	const url = media?.data?.attributes?.url
	return {
		data: {
			attributes: {
				url: typeof url === 'string' ? url : undefined,
			},
		},
	}
}

/**
 * A list of medias in the REST format of Strapi: { data: [{ attributes: { url } }] }
 * @private
 */
function mapRestMediaList(medias) {
	if (!Array.isArray(medias?.data)) return null
	return {
		data: medias.data.map(media => ({
			attributes: {
				url:
					typeof media?.attributes?.url === 'string'
						? media.attributes.url
						: undefined,
			},
		})),
	}
}

/**
 * Map the response of /api/content-website?populate=deep.
 * @public
 * @param data raw API response
 * @returns {{home_title, metadata_description, home_background_images, metadata_title, home_image, home_subtitle}}
 */
export function mapContentWebsitePayload(data) {
	const content = data?.data?.attributes?.content
	return {
		metadata_title: scalar(content?.metadata_title),
		metadata_description: scalar(content?.metadata_description),
		home_title: scalar(content?.home_title),
		home_subtitle: scalar(content?.home_subtitle),
		home_image: mapRestMedia(content?.home_image),
		home_background_images: mapRestMediaList(content?.home_background_images),
	}
}
