import '@/styles/globals.css'
import { getAllContentWebsite } from '@/services/getData'
import { Lato, Fraunces } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'

const lato = Lato({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: '--font-lato',
	style: ['normal', 'italic'],
})

const fraunces = Fraunces({
	weight: ['100', '300', '400', '700', '900'],
	subsets: ['latin'],
	variable: '--font-fraunces',
	style: ['normal', 'italic'],
})

export async function generateMetadata() {
	// fetch data
	const content_website = await getAllContentWebsite()

	return {
		title:
			content_website?.metadata_title ||
			'ForMenu la carte digitale pour les restaurateurs',
		description:
			content_website?.metadata_description ||
			"La carte qui s'adapte réellement à votre restaurant",
		metadataBase: new URL(`https://app.formenu.fr`),
		alternates: {
			canonical: '/',
			languages: {
				'fr-FR': '/',
				'en-US': 'https://app.formenu.net',
			},
		},
	}
}

export default async function RootLayout({ children }) {
	return (
		<html
			lang="fr"
			className={`bg-gray-50 ${lato.variable} ${fraunces.variable}`}
		>
			<Script
				async
				src="https://umami.wadefade.fr/script.js"
				strategy={'afterInteractive'}
				data-website-id="911083ce-df29-4499-a611-e43c70defd8b"
			/>
			<body
				className={'relative flex min-h-screen w-full flex-col text-gray-950'}
			>
				<main className={'h-full min-h-screen'}>{children}</main>
			</body>
		</html>
	)
}
