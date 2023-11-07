import { create } from 'zustand'
import { optionsSortData } from '@/enum/optionsSortData'

const checkDietRecursive = (dish, diet) => {
	// Check the diet for the current dish
	const isDietMatch =
		(diet === 'vegetarian' && dish.is_vegetarian) ||
		(diet === 'vegan' && dish.is_vegan) ||
		diet === 'default' ||
		diet === 'omnivore'

	// If the diet does not match, return false
	if (!isDietMatch) return false

	// If the dish has subdishes, check the diet recursively for each subdish
	if (dish.dishes) {
		return dish.dishes.every(subdish => checkDietRecursive(subdish, diet))
	}

	// If there are no subdishes or if all subdishes match the diet, return true
	return true
}

const checkAllergensRecursive = (dish, selectedAllergens) => {
	// Check allergens for the current dish
	const hasAllergen = selectedAllergens.some(
		allergen => dish?.allergens[allergen]
	)

	// If the dish has an allergen, return false
	if (hasAllergen) return false

	// If the dish has subdishes, check allergens recursively for each subdish
	if (dish.dishes) {
		return dish.dishes.every(subdish =>
			checkAllergensRecursive(subdish, selectedAllergens)
		)
	}

	// If there are no subdishes or if no subdishes have the allergens, return true
	return true
}

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
		return checkDietRecursive(dish, diet)
	},

	checkAllergens: (dish, selectedAllergens) => {
		if (selectedAllergens?.length === 0) return true
		return checkAllergensRecursive(dish, selectedAllergens)
	},
}))
