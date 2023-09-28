'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useCart } from '@/app/providers/CartProvider'
import { Button, Spinner } from '@nextui-org/react'

export function ShoppingCartResume() {
	const { itemsInCart } = useCart()
	const { isLoading } = useCart()

	return (
		<button className={'btn-nav relative'}>
			{/*{isLoading ? (*/}
			{/*	<Spinner size="sm" />*/}
			{/*) : (*/}
			{/*	<>*/}
			{/*		<h4*/}
			{/*			className={*/}
			{/*				'absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-blue-950 bg-white text-xs font-bold'*/}
			{/*			}*/}
			{/*		>*/}
			{/*			{itemsInCart?.length}*/}
			{/*		</h4>*/}
			{/*		<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />*/}
			{/*	</>*/}
			{/*)}*/}
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
