'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { Spinner } from '@nextui-org/react'
import Link from 'next/link'
import { useCartStore } from '@/providers/useCartStore'
import { useEffect, useState } from 'react'

export function ShoppingCartButtonResume({
	company_slug,
	content_website_from_company,
}) {
	const itemsInCart = useCartStore(state => state.itemsInCart)
	const countItemsInCart = useCartStore(state => state.countItemsInCart)
	const count = useCartStore(state => state.count)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		countItemsInCart()
		setIsLoading(false)
	}, [countItemsInCart, itemsInCart])

	return (
		<Link
			className={`btn-nav relative border-${
				content_website_from_company?.color ?? 'blue'
			}-950`}
			href={`/${company_slug}/cart`}
		>
			{
				<>
					<h4
						className={`absolute -right-2 -top-2 z-30 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
							isLoading
								? 'scale-[0.85] transform'
								: 'border border-blue-950 bg-white'
						}`}
					>
						{isLoading ? <Spinner size={'sm'} /> : <>{count}</>}
					</h4>
					<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
				</>
			}
		</Link>
	)
}
