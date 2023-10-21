import { create } from 'zustand'

export const useCartStore = create(set => ({
	itemsInCart: [],
	count: 0,

	decreaseQuantity: item => {
		set(state => {
			const updatedItems = state.itemsInCart.map(itemInCart => {
				if (itemInCart?.id === item?.id) {
					if (itemInCart?.quantity === 1) {
						return null
					}
					return {
						...itemInCart,
						quantity: itemInCart?.quantity - 1,
					}
				}
				return itemInCart
			})

			// Filtrer les éléments null du tableau
			const filteredItems = updatedItems.filter(item => item !== null)

			return {
				itemsInCart: filteredItems,
			}
		})
	},

	increaseQuantity: item => {
		set(state => ({
			itemsInCart: state.itemsInCart.map(itemInCart => {
				if (itemInCart?.id === item?.id) {
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
		set(state => {
			const itemInCart = state.itemsInCart.find(
				itemInCart => itemInCart.id === item.id
			)
			if (itemInCart) {
				return {
					itemsInCart: state.itemsInCart.map(itemInCart => {
						if (itemInCart.id === item.id) {
							return {
								...itemInCart,
								quantity: itemInCart?.quantity + 1,
							}
						}
						return itemInCart
					}),
				}
			}
			return {
				itemsInCart: [...state.itemsInCart, item],
			}
		})
	},

	resetCart: () => {
		set({ itemsInCart: [] })
	},

	countItemsInCart: () => {
		set(state => ({
			count:
				state.itemsInCart.length > 0
					? state.itemsInCart.reduce(
							(count, item) => count + (item?.quantity || 0),
							0
					  )
					: 0,
		}))
	},
}))
