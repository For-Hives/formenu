'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useEffect, useState } from 'react'

export function ShoppingCart() {
	// Set the value received from the local storage to a local state
	const [itemsInCart, setItemsInCart] = useState([])

	useEffect(() => {
		let value
		// Get the value from local storage if it exists
		value = localStorage.getItem('itemsInCart') || []
		setItemsInCart(value)
	}, [])

	// // When user submits the form, save the favorite number to the local storage
	// const saveToLocalStorage = e => {
	// 	e.preventDefault()
	// 	localStorage.setItem("favoriteNumber", favoriteNumber)
	// }

	return (
		<button className={'btn-nav relative'}>
			{/* number of item in the cart */}
			<h4
				className={
					'absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-blue-950 bg-white text-xs font-bold'
				}
			>
				{itemsInCart.length}
			</h4>
			<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
