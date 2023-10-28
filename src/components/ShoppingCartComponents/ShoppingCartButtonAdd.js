'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonAdd({ newItem }) {
	// Set the value received from the local storage to a local state
	const addItem = useCartStore(state => state.addItem)

	return (
		<button
			className={'btn-nav relative -z-10'}
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
