import { create } from 'zustand'
import { optionsSortData } from '@/enum/optionsSortData'

export const useStore = create(set => ({
	data: [],
	isFilterModalClosed: true,
	selectedDiet: 'default',
	selectedAllergens: [],
	searchTerms: '',
	selectedOptionSort: optionsSortData[0].key,

	setData: data => {
		set({ data: data })
	},

	setSearchTerms: terms => {
		set({ searchTerms: terms })
	},

	setSelectedDiet: diet => {
		set({ selectedDiet: diet })
	},

	setSelectedOptionSort: option => {
		set(state => ({
			selectedOptionSort:
				optionsSortData.find(o => o.key === option) || state.selectedOptionSort,
		}))
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
			searchTerms: '',
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
