'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCart } from '@/app/providers/CartProvider'
import { Spinner } from '@nextui-org/react'

export function ShoppingCartButtonResume() {
	const { itemsInCart } = useCart()
	const { isLoading } = useCart()

	return (
		<button className={'btn-nav relative'}>
			{
				<>
					<h4
						className={`absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
							isLoading
								? 'scale-[0.85] transform'
								: 'border border-blue-950 bg-white'
						}`}
					>
						{isLoading ? <Spinner size={'sm'} /> : <>{itemsInCart?.length}</>}
					</h4>
					<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
				</>
			}
		</button>
	)
}
