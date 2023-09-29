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
									className={'flex w-full items-center justify-start'}
								>
									<Dishes dish={itemInfo(item)} />
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
