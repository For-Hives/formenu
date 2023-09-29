import { Nav } from '@/components/Layout/Nav'
import { CartItemsList } from '@/components/Dishes/CartItemsList'

export default async function Page() {
	return (
		<>
			<Nav
				parent_categories={parent_categories}
				selected_category={current_category_data.id}
			/>
			<div className={'container-menu'}>
				<div
					className={`${
						data ? 'min-h-[calc(100vh-25rem)]' : ''
					} container-sub-menus`}
				>
					<CartItemsList />
				</div>
			</div>
		</>
	)
}
