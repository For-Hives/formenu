'use client'
import { get_data_dishes } from '@/services/getData'
import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { Dishes } from '@/components/Dishes/Dishes'
import { CustomSvg } from '@/components/CustomSvg'
import { useCartStore } from '@/providers/zustand'

export function ShoppingCartItemsList({ company_slug }) {
	// const { itemsInCart, countItemsInCart, increaseQuantity, decreaseQuantity } =
	// 	useCart()
	const countItemsInCart = useCartStore(state => state.countItemsInCart)
	const increaseQuantity = useCartStore(state => state.increaseQuantity)
	const decreaseQuantity = useCartStore(state => state.decreaseQuantity)
	const itemsInCart = useCartStore(state => state.itemsInCart)

	const [dishes, setDishes] = useState([])

	const itemInfo = item => {
		if (!dishes.length) return
		return dishes.find(dish => dish?.id.toString() === item.toString())
	}

	useEffect(() => {
		get_data_dishes(company_slug).then(data => {
			setDishes(data)
		})
	}, [])

	return (
		<div className={'flex w-full flex-col gap-6'}>
			<h2 className={'font-bold'}>
				Les plats dans votre panier ({countItemsInCart() || 0})
			</h2>
			{dishes?.length ? (
				<>
					{itemsInCart?.length ? (
						itemsInCart.map((item, index) => {
							return (
								<div
									key={index}
									className={'relative flex w-full items-center justify-start'}
								>
									<Dishes dish={itemInfo(item?.id)} cartView={true} />
									{/* third possibility */}

									<div
										className={
											'absolute -right-2 -top-2 flex h-8 items-center justify-center gap-4 rounded-lg border border-slate-300 bg-white shadow'
										}
									>
										<button
											className={
												'flex h-full items-center justify-center rounded-l-lg bg-slate-200/50 px-3 py-2 text-xs'
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
													<>
														<CustomSvg
															url={'/icons/bin.svg'}
															classNames={'bg-black h-[14px] w-[14px]'}
														/>
													</>
												) : (
													<>
														<CustomSvg
															url={'/icons/minus.svg'}
															classNames={'bg-black h-[14px] w-[14px]'}
														/>
													</>
												)}
											</div>
										</button>
										<div className={'flex items-center justify-center'}>
											<p className={'text-xs font-bold text-blue-950'}>
												{item?.quantity}
											</p>
										</div>
										<button
											className={
												'flex h-full items-center justify-center rounded-r-lg bg-slate-200/50 px-3 py-2 text-xs'
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
												<CustomSvg
													url={'/icons/plus.svg'}
													classNames={'bg-black h-[14px] w-[14px]'}
												/>
											</div>
										</button>
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
