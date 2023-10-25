import { create } from 'zustand'

export const useStore = create(set => ({
	data: [],
	isFilterModalClosed: true,
	selectedDiet: 'default',
	selectedAllergens: [],
	searchTerms: '',

	setData: data => {
		set({ data: data })
	},

	setSearchTerms: terms => {
		set({ searchTerms: terms })
	},

	setSelectedDiet: diet => {
		set({ selectedDiet: diet })
	},

	toggleAllergen: key => {
		set(state => {
			const selectedAllergens = state.selectedAllergens.includes(key)
				? state.selectedAllergens.filter(item => item !== key)
				: [...state.selectedAllergens, key]

			return { selectedAllergens }
		})
	},

	toggleFilterModal: () => {
		set(state => ({
			isFilterModalClosed: !state.isFilterModalClosed,
		}))
	},

	resetFilter: () => {
		set({
			isFilterModalClosed: true,
			selectedDiet: 'default',
			selectedAllergens: [],
		})
	},

	checkDiet: (dish, diet) => {
		switch (diet) {
			case 'default':
			case 'omnivore':
				return true
			case 'vegetarian':
				return dish.is_vegetarian
			case 'vegan':
				return dish.is_vegan
			default:
				return true
		}
	},

	checkAllergens: (dish, selectedAllergens) => {
		if (selectedAllergens?.length === 0) return true
		return !selectedAllergens.some(allergen => dish?.allergens[allergen])
	},
}))
