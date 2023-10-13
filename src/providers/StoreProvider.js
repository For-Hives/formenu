'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
	const [isFilterModalClosed, setIsFilterModalClosed] = useState(true)
	const [selectedDiet, setSelectedDiet] = useState('default')
	const [selectedAllergens, setSelectedAllergens] = useState([])

	const toggleAllergen = key => {
		if (selectedAllergens.includes(key)) {
			setSelectedAllergens(prev => prev.filter(item => item !== key))
		} else {
			setSelectedAllergens(prev => [...prev, key])
		}
	}

	const toggleFilterModal = () => {
		setIsFilterModalClosed(!isFilterModalClosed)
	}

	const resetFilter = () => {
		setSelectedDiet('default')
		setSelectedAllergens([])
	}

	const checkDiet = dish => {
		switch (selectedDiet) {
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
	}

	const checkAllergens = dish => {
		if (selectedAllergens.length === 0) {
			return true
		} else {
			return selectedAllergens.every(allergen => {
				// This line checks if the allergen exists and if its value is truthy
				return dish?.allergens[allergen]
			})
		}
	}

	return (
		<StoreContext.Provider
			value={{
				isFilterModalClosed,
				toggleFilterModal,
				selectedDiet,
				selectedAllergens,
				toggleAllergen,
				setSelectedDiet,
				setSelectedAllergens,
				resetFilter,
				checkAllergens,
				checkDiet,
			}}
		>
			{children}
		</StoreContext.Provider>
	)
}

export function useStore() {
	const context = useContext(StoreContext)
	if (context === undefined) {
		throw new Error('useStore must be used within a StoreProvider')
	}
	return context
}
