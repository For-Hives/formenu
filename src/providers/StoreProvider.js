'use client'
import { createContext, useContext, useState } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
	const [isFilterModalClosed, setIsFilterModalClosed] = useState(true)

	const toggleFilterModal = () => {
		setIsFilterModalClosed(!isFilterModalClosed)
	}

	return (
		<StoreContext.Provider value={{ isFilterModalClosed, toggleFilterModal }}>
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
