import '@/styles/globals.css'
import { getAllContentWebsite } from '@/services/getData'

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
		links: [
			{
				rel: 'preconnect',
				href: 'https://fonts.googleapis.com',
			},
			{
				rel: 'preconnect',
				href: 'https://fonts.gstatic.com',
				crossOrigin: true,
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap',
			},
		],
	}
}

export default async function RootLayout({ children }) {
	return (
		<html lang="fr" className={'bg-slate-50'}>
			<body
				className={'relative flex min-h-screen w-full flex-col text-slate-950'}
			>
				<main className={'h-full min-h-screen'}>{children}</main>
			</body>
		</html>
	)
}
