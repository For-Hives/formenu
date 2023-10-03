'use client'
import { createContext, useContext, useState } from 'react'

const StoreContext = createContext()

export function StoreProvider({ children }) {
	const [navbarState, setNavbarState] = useState(false)

	const toggleNavbar = () => {
		setNavbarState(!navbarState)
	}

	return (
		<StoreContext.Provider value={{ navbarState, toggleNavbar }}>
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
