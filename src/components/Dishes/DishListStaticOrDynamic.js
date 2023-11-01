'use client'
import DishesList from '@/components/Dishes/DishesList'

import { useStore } from '@/providers/useStore'
import { optionsSortData } from '@/enum/optionsSortData'
import { Suspense, useState } from 'react'
import { Skeleton } from '@nextui-org/react'
import SkeletonDish from '@/components/Loaders/SkeletonDish'

export function DishListStaticOrDynamic({
	category,
	company,
	DishesListStatic,
	data,
}) {
	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)
	const searchTerms = useStore(state => state.searchTerms)
	const selectedOptionSort = useStore(state => state.selectedOptionSort)

	const [isLoaded, setIsLoaded] = useState(false)

	return (
		<>
			{!isLoaded ? (
				<SkeletonDish isLoaded={true}></SkeletonDish>
			) : (
				<>
					{selectedDiet === 'default' &&
					selectedAllergens.length === 0 &&
					searchTerms === '' &&
					selectedOptionSort === optionsSortData[0].key ? (
						DishesListStatic
					) : (
						<DishesList category={category} company={company} data={data} />
					)}
				</>
			)}
		</>
	)
}
