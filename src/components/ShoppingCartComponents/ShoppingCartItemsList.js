'use client'
import { useCart } from '@/providers/CartProvider'
import { getDishes, getDishFromId } from '@/services/getData'
import { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'
import { Dishes } from '@/components/Dishes/Dishes'

export function ShoppingCartItemsList() {
	const { itemsInCart } = useCart()

	const [dishes, setDishes] = useState([])

	const itemInfo = item => {
		if (!dishes.length) return
		return dishes.find(dish => dish.id.toString() === item.toString())
	}

	useEffect(() => {
		getDishes().then(data => {
			setDishes(data.data)
		})
	}, [])

	return (
		<div className={'flex w-full flex-col gap-6'}>
			{dishes?.length ? (
				<>
					{itemsInCart?.length ? (
						itemsInCart.map((item, index) => {
							return (
								<div
									key={index}
									className={'relative flex w-full items-center justify-start'}
								>
									<Dishes dish={itemInfo(item.id)} />
									{/*	quantity */}
									{/*<div*/}
									{/*	className={*/}
									{/*		'absolute right-0 top-0 flex items-center justify-center rounded-bl-lg rounded-tr-lg bg-blue-950 px-3 py-1'*/}
									{/*	}*/}
									{/*>*/}
									{/*	<p className={'text-xs font-bold text-white'}>*/}
									{/*		Quantité : {item.quantity}*/}
									{/*	</p>*/}
									{/*</div>*/}

									{/*<div*/}
									{/*	className={*/}
									{/*		'absolute -right-2 -top-2 flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1 shadow'*/}
									{/*	}*/}
									{/*>*/}
									{/*	<p className={'text-xs text-blue-950'}>*/}
									{/*		Quantité : {item.quantity}*/}
									{/*	</p>*/}
									{/*</div>*/}

									<div
										className={
											'absolute -right-2 -top-2 flex items-center justify-center rounded-lg border border-slate-300 bg-white px-3 py-1 shadow'
										}
									>
										<p className={'text-xs text-blue-950'}>{item.quantity}</p>
									</div>

									{/*<div*/}
									{/*	className={*/}
									{/*		'absolute right-0 top-0 flex items-center justify-center rounded-bl-lg rounded-tr-lg bg-blue-950 px-3 py-1'*/}
									{/*	}*/}
									{/*>*/}
									{/*	<p className={'text-xs font-bold text-white'}>*/}
									{/*		{item.quantity}*/}
									{/*	</p>*/}
									{/*</div>*/}
								</div>
							)
						})
					) : (
						<div className={'flex w-full items-center justify-start'}>
							<p>No items in cart</p>
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
