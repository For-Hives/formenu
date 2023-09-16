export function convertStringToKebabCase(str) {
	// Normalize the string to Unicode NFD form
	const normalizedStr = str.normalize('NFD')

	// Remove accents using a regular expression
	const withoutAccents = normalizedStr.replace(/[\u0300-\u036f]/g, '')

	// Replace spaces with '-' and convert to lowercase
	return withoutAccents.replace(/\s+/g, '-').toLowerCase()
}

export function createSlug(data, record, index) {
	const next = data?.data[index + 1]?.id.toString() ?? 'none'
	const previous = data?.data[index - 1]?.id.toString() ?? 'none'
	const previous_previous = data?.data[index - 2]?.id.toString() ?? 'none'
	const next_next = data?.data[index + 2]?.id.toString() ?? 'none'
	const current = record.id.toString()
	return `/${current}?n=${next}&p=${previous}&nn=${next_next}&pp=${previous_previous}`
}
