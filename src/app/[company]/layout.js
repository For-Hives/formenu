import { CardBackground } from '@/components/Background/CardBackground'
import { getAllData_FromCompany, getContentWebsite } from '@/services/getData'

export async function generateMetadata({ params }) {
	// fetch data
	const content_website_from_company = await getAllData_FromCompany(
		params.company
	)

	console.log(content_website_from_company)
	return {
		title:
			content_website_from_company?.data?.attributes?.metadata_title ||
			'ForMenu la carte digitale pour les restaurateurs',
		description:
			content_website_from_company?.data?.attributes?.metadata_description ||
			"La carte qui s'adapte réellement à votre restaurant",
	}
}

export default async function Layout({ children }) {
	const content_website = await getContentWebsite()

	return (
		<>
			<CardBackground
				placementClassName={'-z-10 -right-40 -top-48 rotate-15'}
				src={`${content_website.data.attributes.home_background_images.data[0].attributes.url}`}
				alt={'Background restaurant'}
			/>
			<CardBackground
				placementClassName={
					'-z-10 -left-40 top-1/2 rotate-30 translate-y-[-50%]'
				}
				src={`${content_website.data.attributes.home_background_images.data[1].attributes.url}`}
				alt={'Background restaurant 2'}
			/>
			<CardBackground
				placementClassName={'-z-10 right-8 -bottom-48 -rotate-15'}
				src={`${content_website.data.attributes.home_background_images.data[2].attributes.url}`}
				alt={'Background restaurant 3'}
			/>
			{children}
		</>
	)
}
