'use client'

import { useState, useEffect } from 'react'
import { Dishes } from '@/components/Dishes/Dishes'
import { useStore } from '@/providers/useStore'
import { checkIfActivated } from '@/services/checkIfActivated'

const DishesList = ({ category, company, data }) => {
	const [filteredDishes, setFilteredDishes] = useState(null)

	const checkDiet = useStore(state => state.checkDiet)
	const checkAllergens = useStore(state => state.checkAllergens)

	const dataStore = useStore(state => state.data)
	const setData = useStore(state => state.setData)

	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)
	const selectedOptionSort = useStore(state => state.selectedOptionSort)
	const searchTerms = useStore(state => state.searchTerms)

	useEffect(() => {
		if (!dataStore && searchTerms === '') {
			// 	get data
			setData(data.dishes)
		}
		if (!dataStore) return

		setFilteredDishes(
			dataStore.filter(dish => {
				return (
					checkDiet(dish, selectedDiet) &&
					checkAllergens(dish, selectedAllergens)
				)
			})
		)
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
					{filteredDishes.map(
						(dish, index) =>
							checkIfActivated(dish) && <Dishes dish={dish} key={dish.id} />
					)}
				</div>
			) : (
				<div className={`container-dishes`}>
					<p className={`text-sm italic`}>
						Aucun plat ne correspond à vos critères de recherche
					</p>
				</div>
			)}
		</>
	)
}

export default DishesList
