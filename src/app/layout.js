import '@/styles/globals.css'
import { CardBackground } from '@/components/Background/CardBackground'
import Image from 'next/image'
import { CartProvider } from '@/providers/CartProvider'
import { WrapNextUiProviders } from '@/providers/WrapNextUiProvider'

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

export default async function RootLayout({ children }) {
	return (
		<html lang="fr">
			<body
				className={
					'flex min-h-screen w-full flex-col bg-slate-50 text-slate-950'
				}
			>
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
				<main className={'h-full min-h-screen'}>
					<section className={'px-2 py-16 sm:px-4 sm:py-20'}>
						<div
							className={
								'flex w-full items-center justify-center gap-4 sm:gap-8'
							}
						>
							<Image
								src={'/icons/logo_restaurant.svg'}
								width={50}
								height={50}
								alt={'logo_restaurant'}
								className={'h-8 w-8 sm:h-12 sm:w-12'}
							/>
							<div className={'flex flex-col gap-1 sm:gap-2'}>
								<h1 className={'formenu-h1'}>{`Les pieds dans l'eau`}</h1>
								<h2 className={'ml-4'}>traditionnel et authentique</h2>
							</div>
						</div>
						<WrapNextUiProviders>
							<CartProvider>
								<div className={'pt-16 sm:pt-20'}>{children}</div>
							</CartProvider>
						</WrapNextUiProviders>
					</section>
				</main>
			</body>
		</html>
	)
}
