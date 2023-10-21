'use client'
import Image from 'next/image'

import { useStore } from '@/providers/useStore'

export function ButtonFilter() {
	const toggleFilterModal = useStore(state => state.toggleFilterModal)

	return (
		<button
			className={'btn-nav'}
			onClick={() => {
				toggleFilterModal()
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
