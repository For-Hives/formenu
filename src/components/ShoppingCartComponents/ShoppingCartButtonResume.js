'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { Spinner } from '@nextui-org/react'
import Link from 'next/link'

import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartButtonResume({ company_slug }) {
	// const { itemsInCart, countItemsInCart, isLoading } = useCart()
	const countItemsInCart = useCartStore(state => state.countItemsInCart)
	const isLoading = useCartStore(state => state.isLoading)

	return (
		<Link className={'btn-nav relative'} href={`/${company_slug}/cart`}>
			{
				<>
					<h4
						className={`absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
							isLoading
								? 'scale-[0.85] transform'
								: 'border border-blue-950 bg-white'
						}`}
					>
						{isLoading ? <Spinner size={'sm'} /> : <>{countItemsInCart()}</>}
					</h4>
					<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
				</>
			}
		</Link>
	)
}
