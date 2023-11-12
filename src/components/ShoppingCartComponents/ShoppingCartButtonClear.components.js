'use client'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonClearComponents({
	content_website_from_company,
}) {
	const resetCart = useCartStore(state => state.resetCart)

	return (
		<button
			className={`btn-nav relative z-30 border-${
				content_website_from_company?.color ?? 'blue'
			}-950`}
			onClick={() => resetCart()}
		>
			<CustomSvgComponents
				url={'/icons/shopping_clear.svg'}
				classNames={`bg-${content_website_from_company?.color ?? 'blue'}-950`}
			/>
		</button>
	)
}
