import { Nav } from '@/components/Layout/Nav'
import { ShoppingCartItemsList } from '@/components/ShoppingCartComponents/ShoppingCartItemsList'
import { getAllData_FromCompany } from '@/services/getData'

export default async function Page({ params }) {
	const { company } = params
	const content_website_from_company = await getAllData_FromCompany(
		params.company
	)

	return (
		<>
			<Nav company_slug={company} />
			<div className={'container-menu'}>
				<div className={`container-sub-menus`}>
					<ShoppingCartItemsList
						company_slug={company}
						content_website_from_company={content_website_from_company}
					/>
				</div>
			</div>
		</>
	)
}
