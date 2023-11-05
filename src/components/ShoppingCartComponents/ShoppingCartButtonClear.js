'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonClear({ content_website_from_company }) {
	const resetCart = useCartStore(state => state.resetCart)

	return (
		<button
			className={`btn-nav relative z-30 border-${
				content_website_from_company?.color ?? 'blue'
			}-950`}
			onClick={() => resetCart()}
		>
			<CustomSvg url={'/icons/shopping_clear.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
