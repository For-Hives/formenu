import { create } from 'zustand'

export const useCartStore = create(set => ({
	itemsInCart: [],
	isLoading: true,

	decreaseQuantity: item => {
		set(state => ({
			itemsInCart: state.itemsInCart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					if (itemInCart?.quantity === 1) {
						return null
					}
					return {
						...itemInCart,
						quantity: itemInCart?.quantity - 1,
					}
				}
				return itemInCart
			}),
		}))
	},

	increaseQuantity: item => {
		set(state => ({
			itemsInCart: state.itemsInCart.map(itemInCart => {
				if (itemInCart.id === item.id) {
					return {
						...itemInCart,
						quantity: itemInCart?.quantity + 1,
					}
				}
				return itemInCart
			}),
		}))
	},

	addItem: item => {
		const itemInCart = set(state =>
			state.itemsInCart.find(itemInCart => itemInCart.id === item.id)
		)
		if (itemInCart) {
			set(state => ({
				itemsInCart: state.itemsInCart.map(itemInCart => {
					if (itemInCart.id === item.id) {
						return {
							...itemInCart,
							quantity: itemInCart?.quantity + 1,
						}
					}
					return itemInCart
				}),
			}))
			return
		}
		set(state => ({
			itemsInCart: [...state.itemsInCart, item],
		}))
	},

	resetCart: () => {
		set({ itemsInCart: [] })
	},

	// cleanData: data => {
	// 	if (!data || !data.length) return []
	// 	return data.filter(
	// 		item => item && (typeof item !== 'string' || item.trim() !== '')
	// 	)
	// },
	//
	// getItemsInCart: () => {
	// 	// Get the value from local storage if it exists
	// 	const value = localStorage.getItem('itemsInCart')
	// 	let valueParsed = JSON.parse(value)
	// 	// Use the cleanData function
	// 	valueParsed = cleanData(valueParsed)
	// 	valueParsed !== '' &&
	// 		valueParsed?.length &&
	// 		set({ itemsInCart: valueParsed })
	// },

	countItemsInCart: () =>
		set(state => ({
			itemsInCart: state.itemsInCart.reduce(
				(count, item) => count + item?.quantity,
				0
			),
		})),
}))
