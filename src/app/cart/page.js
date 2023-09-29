import { Nav } from '@/components/Layout/Nav'
import { ShoppingCartItemsList } from '@/components/ShoppingCartComponents/ShoppingCartItemsList'

export default async function Page() {
	return (
		<>
			<Nav />
			<div className={'container-menu'}>
				<div className={`container-sub-menus`}>
					<ShoppingCartItemsList />
				</div>
			</div>
		</>
	)
}
