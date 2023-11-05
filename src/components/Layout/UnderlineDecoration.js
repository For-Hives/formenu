'use client'

import { useEffect, useState } from 'react'

export function UnderlineDecoration({
	parent_categories,
	selected_category,
	content_website_from_company,
}) {
	const [matches, setMatches] = useState(false)

	useEffect(() => {
		// Initialize media query within useEffect to ensure it runs on client side
		const mediaQuery = window.matchMedia('(min-width: 768px)')

		// Set initial value based on client-side value
		setMatches(mediaQuery.matches)

		const handler = e => setMatches(e.matches)
		mediaQuery.addEventListener('change', handler)
		return () => mediaQuery.removeEventListener('change', handler)
	}, []) // The empty dependency array ensures this effect runs only once, similar to componentDidMount

	// get index of the selected category
	const index = parent_categories.findIndex(
		record => record.id.toString() === selected_category.toString()
	)

	let heightStyle
	if (matches) {
		// Desktop
		heightStyle = `calc(${index + 1} * 40px + (${index + 1} - 1) * 64px)`
	} else {
		// Mobile
		heightStyle = `calc(${index + 1} * 40px + (${index + 1} - 1) * 32px)`
	}

	// to display to correct underline on the nav bar, calculate the height of the underline
	// 100% - (40px * number of buttons in the nav bar) - (64px * (number of buttons in the nav bar - 1)) -> desktop
	// 100% - (40px * number of buttons in the nav bar) - (32px * (number of buttons in the nav bar - 1)) -> mobile
	return (
		<div
			className={
				'absolute right-0 top-0 flex w-[40px] flex-col items-center justify-start'
			}
		>
			<div
				style={{
					height: heightStyle,
				}}
				className={`z-0 w-0.5 bg-${
					content_website_from_company?.color ?? 'blue'
				}-950`}
			></div>
			<div className={'z-10 h-screen w-0.5 bg-gray-200'}></div>
		</div>
	)
}
