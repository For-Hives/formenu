'use client'
import Image from 'next/image'
import { useStore } from '@/providers/StoreProvider'

export function ButtonFilter() {
	const { toggleFilterModal } = useStore()
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
