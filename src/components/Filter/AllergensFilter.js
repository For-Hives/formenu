'use client'
import { allergens } from '@/enum/allergensData'
import { useStore } from '@/providers/zustand'
import { AllergenButton } from '@/components/Filter/AllergenButton'

export function AllergensFilter() {
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
					/>
					<p
						className={`text-xs text-slate-600 ${
							selectedAllergens.includes(allergen.key) && 'underline'
						}`}
					>
						{allergen.title.charAt(0).toUpperCase() + allergen.title.slice(1)}
					</p>
				</div>
			))}
		</div>
	)
}
