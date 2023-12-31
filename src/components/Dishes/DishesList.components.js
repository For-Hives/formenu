'use client'

import { Suspense, useEffect, useState } from 'react'
import { DishesComponents } from '@/components/Dishes/Dishes.components'
import { useFilterStore } from '@/providers/useFilterStore'
import { checkIfActivated } from '@/services/checkIfActivated'
import SkeletonDishComponents from '@/components/Skeletons/SkeletonComponent/SkeletonDish.components'

const DishesListComponents = ({
	category,
	company,
	data,
	content_website_from_company,
}) => {
	const [filteredDishes, setFilteredDishes] = useState(null)

	const checkDiet = useFilterStore(state => state.checkDiet)
	const checkAllergens = useFilterStore(state => state.checkAllergens)

	const dataStore = useFilterStore(state => state.data)
	const setData = useFilterStore(state => state.setData)

	const selectedDiet = useFilterStore(state => state.selectedDiet)
	const selectedAllergens = useFilterStore(state => state.selectedAllergens)
	const selectedOptionSort = useFilterStore(state => state.selectedOptionSort)
	const searchTerms = useFilterStore(state => state.searchTerms)

	useEffect(() => {
		if (!dataStore && searchTerms === '') {
			// 	get data
			setData(data.dishes)
		}
		if (!dataStore) return

		let dishes = dataStore.filter(dish => {
			return (
				checkDiet(dish, selectedDiet) && checkAllergens(dish, selectedAllergens)
			)
		})

		switch (selectedOptionSort.key) {
			case 'priceAsc':
				dishes.sort((a, b) => a.price - b.price)
				break
			case 'priceDesc':
				dishes.sort((a, b) => b.price - a.price)
				break
			case 'alphaAZ':
				dishes.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'alphaZA':
				dishes.sort((a, b) => b.name.localeCompare(a.name))
				break
			case 'dateAsc':
				dishes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
				break
			case 'dateDesc':
				dishes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
				break
			default:
				break
		}

		setFilteredDishes(dishes)
	}, [
		category,
		company,
		selectedDiet,
		selectedAllergens,
		selectedOptionSort,
		dataStore,
	])

	return (
		<>
			{filteredDishes && filteredDishes?.length > 0 ? (
				<div className={`container-dishes`}>
					<Suspense fallback={<SkeletonDishComponents />}>
						{filteredDishes.map(
							(dish, index) =>
								checkIfActivated(dish) && (
									<DishesComponents
										dish={dish}
										key={dish.id}
										content_website_from_company={content_website_from_company}
									/>
								)
						)}
					</Suspense>
				</div>
			) : (
				<div className={`container-dishes`}>
					<Suspense fallback={<SkeletonDishComponents />} />
				</div>
			)}
		</>
	)
}

export default DishesListComponents
