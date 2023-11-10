'use client'
import Image from 'next/image'

import { useStore } from '@/providers/useStore'
import { CustomSvgComponents } from '@/components/CustomSvg.components'

export function ButtonFilterComponents({ content_website_from_company }) {
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
			<CustomSvgComponents
				url={'/icons/magnifying-glass.svg'}
				classNames={`!h-[15px] !w-[15px] bg-${
					content_website_from_company?.color ?? 'blue'
				}-950`}
			/>
		</button>
	)
}
