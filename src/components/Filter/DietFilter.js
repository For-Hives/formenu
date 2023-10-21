'use client'
import { diets } from '@/enum/dietsData'
import { DietButton } from '@/components/Filter/DietButton'
import { useStore } from '@/providers/zustand'

export function DietFilter() {
	const selectedDiet = useStore(state => state.selectedDiet)
	const setSelectedDiet = useStore(state => state.setSelectedDiet)

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{diets.map(diet => (
				<div
					key={diet.key}
					className={
						'col-span-3 flex flex-col items-center justify-center gap-2'
					}
				>
					<DietButton
						diet={diet}
						selectedDiet={selectedDiet}
						onDietChange={setSelectedDiet}
					/>
					<p
						className={`text-xs text-slate-600 ${
							selectedDiet === diet.key && 'underline'
						}`}
					>
						{diet.key.charAt(0).toUpperCase() + diet.key.slice(1)}
					</p>
				</div>
			))}
		</div>
	)
}
