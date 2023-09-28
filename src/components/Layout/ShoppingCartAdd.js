'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCart } from '@/app/providers/CartProvider'

export function ShoppingCartAdd({ newItem }) {
	// Set the value received from the local storage to a local state
	const { addItem } = useCart()

	return (
		<button
			className={'btn-nav relative'}
			onClick={() => {
				addItem(newItem)
			}}
		>
			<CustomSvg
				url={'/icons/shopping_add.svg'}
				classNames={'bg-blue-950 h-[25px] w-[25px]'}
			/>
		</button>
	)
}
