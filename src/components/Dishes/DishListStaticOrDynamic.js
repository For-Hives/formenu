'use client'
import DishesList from '@/components/Dishes/DishesList'

import { useStore } from '@/providers/useStore'
import { optionsSortData } from '@/enum/optionsSortData'
import { Suspense, useState } from 'react'
import SkeletonDish from '@/components/Loaders/SkeletonComponent/SkeletonDish'

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

	return (
		<>
			<Suspense
				fallback={
					<div className={`container-dishes`}>
						<SkeletonDish />
					</div>
				}
			>
				{selectedDiet === 'default' &&
				selectedAllergens.length === 0 &&
				searchTerms === '' &&
				selectedOptionSort === optionsSortData[0].key ? (
					DishesListStatic
				) : (
					<DishesList category={category} company={company} data={data} />
				)}
			</Suspense>
		</>
	)
}
