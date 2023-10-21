import { create } from 'zustand'

export const useStore = create(set => ({
	isFilterModalClosed: true,
	selectedDiet: 'default',
	selectedAllergens: [],

	setSelectedDiet: diet => {
		set({ selectedDiet: diet })
	},

	toggleAllergen: key => {
		set(state => ({
			selectedAllergens: state.selectedAllergens.includes(key)
				? state.selectedAllergens.filter(item => item !== key)
				: [...state.selectedAllergens, key],
		}))
	},

	toggleFilterModal: () => {
		set(state => ({
			isFilterModalClosed: !state.isFilterModalClosed,
		}))
	},

	resetFilter: () => {
		set({
			selectedDiet: 'default',
			selectedAllergens: [],
		})
	},

	checkDiet: dish => {
		return set(state => {
			switch (state.selectedDiet) {
				case 'default':
				case 'omnivore':
					return true
				case 'vegetarian':
					return dish?.is_vegetarian
				case 'vegan':
					return dish?.is_vegan
				default:
					return false
			}
		})
	},

	checkAllergens: dish => {
		if (selectedAllergens.length === 0) {
			return true
		} else {
			return selectedAllergens.every(allergen => {
				return dish?.allergens[allergen]
			})
		}
	},
}))
