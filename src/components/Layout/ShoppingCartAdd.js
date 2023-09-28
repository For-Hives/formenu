'use client'
import { CustomSvg } from '@/components/CustomSvg'
import { useEffect, useState } from 'react'

export function ShoppingCartAdd({ newItem }) {
	// Set the value received from the local storage to a local state
	const [itemsInCart, setItemsInCart] = useState([])

	useEffect(() => {
		let value
		// Get the value from local storage if it exists
		value = localStorage.getItem('itemsInCart') || []
		value = value?.length ? JSON.parse(value) : []
		setItemsInCart(value)
	}, [])

	// When user submits the form, save the favorite number to the local storage
	const saveToLocalStorage = e => {
		e.preventDefault()
		let newItemsInCart = [...itemsInCart, newItem]
		localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
		setItemsInCart(newItemsInCart)
	}

	return (
		<button className={'btn-nav relative'} onClick={() => saveToLocalStorage}>
			<CustomSvg
				url={'/icons/shopping_add.svg'}
				classNames={'bg-blue-950 h-[25px] w-[25px]'}
			/>
		</button>
	)
}
