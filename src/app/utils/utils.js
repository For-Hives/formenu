export function convertStringToKebabCase(str) {
	// Normalize the string to Unicode NFD form
	const normalizedStr = str.normalize('NFD')

	// Remove accents using a regular expression
	const withoutAccents = normalizedStr.replace(/[\u0300-\u036f]/g, '')

	// Replace spaces with '-' and convert to lowercase
	return withoutAccents.replace(/\s+/g, '-').toLowerCase()
}
