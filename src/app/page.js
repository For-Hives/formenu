import { LanguageSwitchComponents } from '@/components/LanguageSwitch.components'
import { CompaniesLinksComponents } from '@/components/CompaniesLinks.components'
import { CardBackgroundComponents } from '@/components/Background/CardBackground.components'
import { getAllContentWebsite } from '@/services/getData'
import Image from 'next/image'
import { WrapNextUiProviders } from '@/providers/WrapNextUiProvider'

export default async function Page() {
	const content_website = await getAllContentWebsite()

	return (
		<section className={'px-2 py-24 sm:px-4 sm:py-20'}>
			<div className={'flex w-full items-center justify-center gap-4 sm:gap-8'}>
				<Image
					src={`${content_website?.home_image?.data?.attributes?.url}`}
					width={50}
					height={50}
					alt={'logo_restaurant'}
					className={'h-8 w-8 sm:h-12 sm:w-12'}
				/>
				<div className={'flex flex-col gap-1 sm:gap-2'}>
					<h1
						className={'formenu-h1 font-fraunces'}
					>{`${content_website?.home_title}`}</h1>
					<h2
						className={'ml-4 font-fraunces'}
					>{`${content_website?.home_subtitle}`}</h2>
				</div>
			</div>
			<WrapNextUiProviders>
				<div className={'pt-16 sm:pt-20'}>
					<CardBackgroundComponents
						placementClassName={'-z-10 -right-40 -top-48 rotate-15'}
						src={`${content_website?.home_background_images?.data[0].attributes?.url}`}
						alt={'Background restaurant'}
					/>
					<CardBackgroundComponents
						placementClassName={
							'-z-10 -left-40 top-1/2 rotate-30 translate-y-[-50%]'
						}
						src={`${content_website?.home_background_images?.data[1].attributes?.url}`}
						alt={'Background restaurant 2'}
					/>
					<CardBackgroundComponents
						placementClassName={'-z-10 right-8 -bottom-48 -rotate-15'}
						src={`${content_website?.home_background_images?.data[2].attributes?.url}`}
						alt={'Background restaurant 3'}
					/>
					<div className={'container-menus'}>
						<nav
							className={
								'pointer-events-none fixed left-0 top-0 h-screen w-screen select-none pb-16 md:pb-0'
							}
						>
							<div className={'grid h-full w-full grid-cols-1'}>
								<div
									className={
										'col-span-1 flex flex-col items-end justify-between gap-32 p-4 md:p-8'
									}
								>
									<LanguageSwitchComponents />
								</div>
							</div>
						</nav>
						<CompaniesLinksComponents />
					</div>
				</div>
			</WrapNextUiProviders>
		</section>
	)
}
