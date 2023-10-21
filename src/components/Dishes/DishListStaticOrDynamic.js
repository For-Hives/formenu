'use client'
import DishesList from '@/components/Dishes/DishesList'
import { useStore } from '@/providers/zustand'

export function DishListStaticOrDynamic({
	category,
	company,
	DishesListStatic,
}) {
	// const { selectedDiet, selectedAllergens } = useStore()
	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)

	return (
		<>
			{selectedDiet === 'default' && selectedAllergens.length === 0 ? (
				DishesListStatic
			) : (
				<DishesList category={category} company={company} />
			)}
		</>
	)
}
