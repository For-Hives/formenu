/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**.andy-cinquin.fr',
			},
		],
	},
	experimental: {
		// Defaults to 50MB
		isrMemoryCacheSize: 0,
		largePageDataBytes: 5000000,
	},
	i18n: {
		localeDetection: false,
		locales: ['fr', 'en'],
		defaultLocale: 'fr',
		domains: [
			{
				domain: 'formenu.fr',
				defaultLocale: 'fr',
				locales: ['fr'],
			},
			{
				domain: 'formenu.net',
				defaultLocale: 'en',
				locales: ['en'],
			},
		],
	},
	webpack: config => {
		let modularizeImports = null
		config.module.rules.some(rule =>
			rule.oneOf?.some(oneOf => {
				modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports
				return modularizeImports
			})
		)
		if (modularizeImports?.['@headlessui/react'])
			delete modularizeImports['@headlessui/react']
		return config
	},
}

module.exports = nextConfig
