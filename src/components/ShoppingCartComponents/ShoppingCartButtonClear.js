'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonClear() {
	const resetCart = useCartStore(state => state.resetCart)

	return (
		<button className={'btn-nav relative'} onClick={() => resetCart()}>
			<CustomSvg url={'/icons/shopping_clear.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
