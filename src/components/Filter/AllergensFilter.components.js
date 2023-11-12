'use client'
import { allergens } from '@/enum/allergensData'
import { AllergenButtonComponents } from '@/components/Filter/AllergenButton.components'
import { useFilterStore } from '@/providers/useFilterStore'

export function AllergensFilterComponents({ content_website_from_company }) {
	const selectedAllergens = useFilterStore(state => state.selectedAllergens)
	const toggleAllergen = useFilterStore(state => state.toggleAllergen)

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{allergens.map(allergen => (
				<div
					className={
						'col-span-3 flex flex-col items-center justify-center gap-2'
					}
					key={allergen.key}
				>
					<AllergenButtonComponents
						allergen={allergen}
						selectedAllergens={selectedAllergens}
						onAllergenToggle={toggleAllergen}
						content_website_from_company={content_website_from_company}
					/>
					<p
						className={`text-xs text-gray-600 ${
							selectedAllergens?.includes(allergen.key) && 'underline'
						}`}
					>
						{allergen.title.charAt(0).toUpperCase() + allergen.title.slice(1)}
					</p>
				</div>
			))}
		</div>
	)
}
