'use client'
import { allergens } from '@/enum/allergensData'
import { AllergenButton } from '@/components/Filter/AllergenButton'
import { useStore } from '@/providers/useStore'

export function AllergensFilter({ content_website_from_company }) {
	const selectedAllergens = useStore(state => state.selectedAllergens)
	const toggleAllergen = useStore(state => state.toggleAllergen)

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{allergens.map(allergen => (
				<div
					className={
						'col-span-3 flex flex-col items-center justify-center gap-2'
					}
					key={allergen.key}
				>
					<AllergenButton
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
