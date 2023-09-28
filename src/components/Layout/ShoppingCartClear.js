'use client'
import { CustomSvg } from '@/components/CustomSvg'

export function ShoppingCartClear() {
	const resetCart = () => {
		localStorage.setItem('itemsInCart', '')
	}

	return (
		<button className={'btn-nav relative'} onClick={resetCart}>
			<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
