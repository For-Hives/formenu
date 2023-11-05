'use client'
import Image from 'next/image'

import { useStore } from '@/providers/useStore'

export function ButtonFilter() {
	const toggleFilterModal = useStore(state => state.toggleFilterModal)

	return (
		<button
			className={`btn-nav border-${
				content_website_from_company?.color ?? 'blue'
			}-950`}
			onClick={() => {
				toggleFilterModal()
				// 	scroll to top
				window.scrollTo(0, 0)
			}}
		>
			<Image
				src={'/icons/magnifying-glass.svg'}
				alt={'search button'}
				width={15}
				height={15}
			/>
		</button>
	)
}
