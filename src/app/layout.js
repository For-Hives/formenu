import './styles/globals.css'
import { CardBackground } from '@/components/Background/cardBackground'

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
			<body className={'flex min-h-screen w-full flex-col text-slate-950'}>
				<CardBackground
					placementClassName={'-right-40 -top-48 rotate-15'}
					src={'/images/bg_1.jpg'}
					alt={'Background restaurant'}
				/>
				<CardBackground
					placementClassName={'-left-40 top-1/2 rotate-30 translate-y-[-50%]'}
					src={'/images/bg_2.jpg'}
					alt={'Background restaurant 2'}
				/>

				<CardBackground
					placementClassName={'right-8 -bottom-48 -rotate-15'}
					src={'/images/bg_3.jpg'}
					alt={'Background restaurant 3'}
				/>
				<main>{children}</main>
			</body>
		</html>
	)
}
