'use client'
import DishesList from '@/components/Dishes/DishesList'
import { useStore } from '@/providers/StoreProvider'

export function DishListStaticOrDynamic({
	category,
	company,
	DishesListStatic,
}) {
	const { selectedDiet, selectedAllergens } = useStore()

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
