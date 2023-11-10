import { NavComponents } from '@/components/Layout/Nav.components'
import { ShoppingCartItemsListComponents } from '@/components/ShoppingCartComponents/ShoppingCartItemsList.components'
import { getAllData_FromCompany } from '@/services/getData'

export default async function Page({ params }) {
	const { company } = params
	const content_website_from_company = await getAllData_FromCompany(
		params.company
	)

	return (
		<>
			<NavComponents company_slug={company} />
			<div className={'container-menu'}>
				<div className={`container-sub-menus`}>
					<ShoppingCartItemsListComponents
						company_slug={company}
						content_website_from_company={content_website_from_company}
					/>
				</div>
			</div>
		</>
	)
}
