import { Nav } from '@/components/Layout/Nav'
import { ShoppingCartItemsList } from '@/components/ShoppingCartComponents/ShoppingCartItemsList'

export default async function Page({ params }) {
	const { company } = params

	return (
		<>
			<Nav company_slug={company} />
			<div className={'container-menu'}>
				<div className={`container-sub-menus`}>
					<ShoppingCartItemsList company_slug={company} />
				</div>
			</div>
		</>
	)
}
