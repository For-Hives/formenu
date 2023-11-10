'use client'
import DishesListComponents from '@/components/Dishes/DishesList.components'

import { useStore } from '@/providers/useStore'
import { optionsSortData } from '@/enum/optionsSortData'
import { Suspense, useState } from 'react'
import SkeletonDishComponents from '@/components/Skeletons/SkeletonComponent/SkeletonDish.components'

export function DishListStaticOrDynamicComponents({
	category,
	company,
	DishesListStatic,
	data,
	content_website_from_company,
}) {
	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)
	const searchTerms = useStore(state => state.searchTerms)
	const selectedOptionSort = useStore(state => state.selectedOptionSort)

	return (
		<Suspense
			fallback={
				<div className={`container-dishes`}>
					<SkeletonDishComponents />
				</div>
			}
		>
			{selectedDiet === 'default' &&
			selectedAllergens.length === 0 &&
			searchTerms === '' &&
			selectedOptionSort === optionsSortData[0].key ? (
				DishesListStatic
			) : (
				<DishesListComponents
					category={category}
					company={company}
					data={data}
					content_website_from_company={content_website_from_company}
				/>
			)}
		</Suspense>
	)
}
