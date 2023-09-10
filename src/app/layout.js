import './styles/globals.css'

export const metadata = {
	title: 'ForMenu la carte digitale pour les restaurateurs',
	description: "La carte qui s'adapte réellement à votre restaurant",
	metadataBase: new URL('https://formenu.fr'),
	alternates: {
		canonical: '/',
		languages: {
			'fr-FR': '/',
			'en-US': 'https://formenu.net',
		},
	},
	link: {
		rel: 'stylesheet',
		href: 'https://use.typekit.net/npl8ujx.css',
	},
}

export default function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body className={'text-slate-950'}>{children}</body>
		</html>
	)
}
