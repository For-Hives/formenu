'use client'
import { createContext, useContext, useState } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
	const [isNavBarClosed, setIsNavBarClosed] = useState(true)

	const toggleNavbar = () => {
		setIsNavBarClosed(!isNavBarClosed)
	}

	return (
		<StoreContext.Provider value={{ isNavBarClosed, toggleNavbar }}>
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
