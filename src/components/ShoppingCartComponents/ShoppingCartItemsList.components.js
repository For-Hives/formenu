'use client'
import { get_data_dishes } from '@/services/getData'
import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { DishesComponents } from '@/components/Dishes/Dishes.components'
import { CustomSvgComponents } from '@/components/CustomSvg.components'

import { useCartStore } from '@/providers/useCartStore'

export function ShoppingCartItemsListComponents({
	company_slug,
	content_website_from_company,
}) {
	const countItemsInCart = useCartStore(state => state.countItemsInCart)
	const count = useCartStore(state => state.count)
	const increaseQuantity = useCartStore(state => state.increaseQuantity)
	const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
	const itemsInCart = useCartStore(state => state.itemsInCart)
	const [isLoading, setIsLoading] = useState(true)

	const [dishes, setDishes] = useState([])

	const itemInfo = item => {
		if (!dishes.length) return
		return dishes.find(dish => dish?.id?.toString() === item?.toString())
	}

	useEffect(() => {
		get_data_dishes(company_slug).then(data => {
			setDishes(data)
		})
	}, [])

	useEffect(() => {
		countItemsInCart()
		setIsLoading(false)
	}, [countItemsInCart, itemsInCart])

	return (
		<div className={'flex w-full flex-col gap-6'}>
			<h2 className={'font-bold'}>Les plats dans votre panier ({count})</h2>
			{dishes?.length ? (
				<>
					{itemsInCart?.length ? (
						itemsInCart.map((item, index) => {
							return (
								<div
									key={index}
									className={`${itemInfo(item?.id) ? 'block' : 'hidden'}`}
								>
									<div
										className={
											'relative flex w-full items-center justify-start'
										}
									>
										<DishesComponents
											dish={itemInfo(item?.id)}
											cartView={true}
											content_website_from_company={
												content_website_from_company
											}
										/>
										{/* third possibility */}
										<div
											className={
												'absolute -right-2 -top-2 flex h-8 items-center justify-center gap-4 rounded-lg border border-gray-300 bg-white shadow'
											}
										>
											<button
												className={
													'flex h-full items-center justify-center rounded-l-lg bg-gray-200/50 px-3 py-2 text-xs'
												}
												onClick={() => {
													decreaseQuantity(item)
												}}
											>
												<div
													className={
														'flex h-full w-full items-center justify-center'
													}
												>
													{item?.quantity === 1 ? (
														<CustomSvgComponents
															url={'/icons/bin.svg'}
															classNames={`bg-${
																content_website_from_company?.color ?? 'blue'
															}-950 !h-[14px] !w-[14px]`}
														/>
													) : (
														<CustomSvgComponents
															url={'/icons/minus.svg'}
															classNames={`bg-${
																content_website_from_company?.color ?? 'blue'
															}-950 !h-[14px] !w-[14px]`}
														/>
													)}
												</div>
											</button>
											<div className={'flex items-center justify-center'}>
												<p
													className={`text-xs font-bold text-${
														content_website_from_company?.color ?? 'blue'
													}-950`}
												>
													{item?.quantity}
												</p>
											</div>
											<button
												className={
													'flex h-full items-center justify-center rounded-r-lg bg-gray-200/50 px-3 py-2 text-xs'
												}
												onClick={() => {
													increaseQuantity(item)
												}}
											>
												<div
													className={
														'flex h-full w-full items-center justify-center'
													}
												>
													<CustomSvgComponents
														url={'/icons/plus.svg'}
														classNames={`bg-${
															content_website_from_company?.color ?? 'blue'
														}-950 !h-[14px] !w-[14px]`}
													/>
												</div>
											</button>
										</div>
									</div>
								</div>
							)
						})
					) : (
						<div className={'flex w-full items-center justify-start'}>
							<p className={'text-xs italic'}>
								{`Il n'y a rien dans votre panier !`}
							</p>
						</div>
					)}
				</>
			) : (
				<>
					<Spinner />
				</>
			)}
		</div>
	)
}
