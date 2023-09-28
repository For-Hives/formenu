'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCart } from '@/app/providers/CartProvider'

export function ShoppingCartClear() {
	const { resetCart } = useCart()
	return (
		<button className={'btn-nav relative'} onClick={() => resetCart()}>
			<CustomSvg url={'/icons/shopping_clear.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
