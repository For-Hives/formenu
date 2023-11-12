'use client'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonAddComponents({
	newItem,
	content_website_from_company,
}) {
	// Set the value received from the local storage to a local state
	const addItem = useCartStore(state => state.addItem)

	return (
		<button
			className={`btn-nav relative -z-10 border-${
				content_website_from_company?.color ?? 'blue'
			}-950`}
			onClick={() => {
				addItem(newItem)
			}}
		>
			<CustomSvgComponents
				url={'/icons/shopping_add.svg'}
				classNames={`bg-${
					content_website_from_company?.color ?? 'blue'
				}-950 !h-[20px] !w-[20px]`}
			/>
		</button>
	)
}
