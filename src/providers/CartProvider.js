'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
	const [itemsInCart, setItemsInCart] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	//     add an item to the cart
	const addItem = item => {
		// check if the item is already in the cart, if it is, increase the quantity
		const itemInCart = itemsInCart.find(itemInCart => itemInCart.id === item.id)
		if (itemInCart) {
			const newItemsInCart = itemsInCart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					return {
						...itemInCart,
						quantity: itemInCart.quantity + 1,
					}
				}
				return itemInCart
			})
			setItemsInCart(newItemsInCart)
			localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
			return
		}
		// if the item is not in the cart, add it
		const newItemsInCart = [...itemsInCart, item]
		setItemsInCart(newItemsInCart)
		localStorage.setItem('itemsInCart', JSON.stringify(newItemsInCart))
	}

	// clear the cart
	const resetCart = () => {
		setItemsInCart([])
		localStorage.setItem('itemsInCart', JSON.stringify([]))
	}

	// get items in cart from local storage
	const getItemsInCart = () => {
		// Get the value from local storage if it exists
		let value = localStorage.getItem('itemsInCart')
		console.log('value', value)
		value !== '' && value?.length && setItemsInCart(JSON.parse(value))
	}

	// execute getItemsInCart on load
	useEffect(() => {
		getItemsInCart()
		setIsLoading(false)
	}, [])

	return (
		<CartContext.Provider
			value={{ itemsInCart, addItem, resetCart, getItemsInCart, isLoading }}
		>
			{children}
		</CartContext.Provider>
	)
}

export function useCart() {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
