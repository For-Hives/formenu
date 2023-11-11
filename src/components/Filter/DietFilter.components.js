'use client'
import { diets } from '@/enum/dietsData'
import { DietButtonComponents } from '@/components/Filter/DietButton.components'

import { useFilterStore } from '@/providers/useFilterStore'

export function DietFilterComponents({ content_website_from_company }) {
	const selectedDiet = useFilterStore(state => state.selectedDiet)
	const setSelectedDiet = useFilterStore(state => state.setSelectedDiet)

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{diets.map(diet => (
				<div
					key={diet.key}
					className={
						'col-span-3 flex flex-col items-center justify-center gap-2'
					}
				>
					<DietButtonComponents
						diet={diet}
						selectedDiet={selectedDiet}
						onDietChange={setSelectedDiet}
						content_website_from_company={content_website_from_company}
					/>
					<p
						className={`text-xs text-gray-600 ${
							selectedDiet === diet.key && 'underline'
						}`}
					>
						{diet.title.charAt(0).toUpperCase() + diet.title.slice(1)}
					</p>
				</div>
			))}
		</div>
	)
}
