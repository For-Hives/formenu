import { CardBackground } from '@/components/Background/CardBackground'
import { getAllData_FromCompany, getContentWebsite } from '@/services/getData'
import Image from 'next/image'

export async function generateMetadata({ params }) {
	// fetch data
	const content_website_from_company = await getAllData_FromCompany(
		params.company
	)

	console.log(content_website_from_company)
	return {
		title:
			content_website_from_company?.data?.attributes?.content?.metadata_title ||
			'ForMenu la carte digitale pour les restaurateurs',
		description:
			content_website_from_company?.data?.attributes?.content
				?.metadata_description ||
			"La carte qui s'adapte réellement à votre restaurant",
	}
}

export default async function Layout({ children }) {
	const content_website = await getContentWebsite()
	console.log('home', content_website?.content?.home_image)

	return (
		<>
			<section className={'px-2 py-16 sm:px-4 sm:py-20'}>
				<div
					className={'flex w-full items-center justify-center gap-4 sm:gap-8'}
				>
					<Image
						src={`${content_website?.content?.home_image?.data?.attributes?.url}`}
						width={50}
						height={50}
						alt={'logo_restaurant'}
						className={'h-8 w-8 sm:h-12 sm:w-12'}
					/>
					<div className={'flex flex-col gap-1 sm:gap-2'}>
						<h1 className={'formenu-h1'}>
							{`${content_website?.content?.home_title}`}
						</h1>
						<h2 className={'ml-4'}>
							{`${content_website?.content?.home_subtitle}`}
						</h2>
					</div>
				</div>
				<div className={'pt-16 sm:pt-20'}>
					<CardBackground
						placementClassName={'-z-10 -right-40 -top-48 rotate-15'}
						src={`${content_website?.content?.home_background_images?.data[0].attributes?.url}`}
						alt={'Background restaurant'}
					/>
					<CardBackground
						placementClassName={
							'-z-10 -left-40 top-1/2 rotate-30 translate-y-[-50%]'
						}
						src={`${content_website?.content?.home_background_images?.data[1].attributes?.url}`}
						alt={'Background restaurant 2'}
					/>
					<CardBackground
						placementClassName={'-z-10 right-8 -bottom-48 -rotate-15'}
						src={`${content_website?.content?.home_background_images?.data[2].attributes?.url}`}
						alt={'Background restaurant 3'}
					/>
					{children}
				</div>
			</section>
		</>
	)
}
