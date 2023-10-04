'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/services/getData'

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
