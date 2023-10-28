'use client'

import { useState, useEffect } from 'react'
import { Dishes } from '@/components/Dishes/Dishes'
import { useStore } from '@/providers/useStore'

const DishesList = ({ category, company }) => {
	const [filteredDishes, setFilteredDishes] = useState(null)

	const checkDiet = useStore(state => state.checkDiet)
	const checkAllergens = useStore(state => state.checkAllergens)

	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)
	const selectedOptionSort = useStore(state => state.selectedOptionSort)

	const dataStore = useStore(state => state.data)

	useEffect(() => {
		if (!dataStore) return
		console.log('dataStore', dataStore)
		console.log('selectedDiet', selectedDiet)
		console.log('selectedAllergens', selectedAllergens)
		console.log('selectedOptionSort', selectedOptionSort)

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

	if (!dataStore) {
		return <div>Loading...</div>
	}

	return (
		<>
			{filteredDishes && filteredDishes?.length > 0 ? (
				<div className={`container-dishes`}>
					{filteredDishes.map((dish, index) => (
						<Dishes dish={dish} key={dish.id} />
					))}
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
