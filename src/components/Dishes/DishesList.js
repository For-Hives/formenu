'use client'

import { useState, useEffect } from 'react'
import { getAllData_DishesFromCategory } from '@/services/getData'
import { Dishes } from '@/components/Dishes/Dishes'
import { useStore } from '@/providers/useStore'

const DishesList = ({ category, company }) => {
	const [data, setData] = useState(null)
	const [filteredDishes, setFilteredDishes] = useState(null)

	const checkDiet = useStore(state => state.checkDiet)
	const checkAllergens = useStore(state => state.checkAllergens)
	const lastDietCheck = useStore(state => state.lastDietCheck)
	const lastAllergensCheck = useStore(state => state.lastAllergensCheck)

	const selectedDiet = useStore(state => state.selectedDiet)
	const selectedAllergens = useStore(state => state.selectedAllergens)

	useEffect(() => {
		console.log('useEffect DishesList')
		getAllData_DishesFromCategory(category, company).then(result => {
			setData(result)
			setFilteredDishes(
				result.dishes.filter(dish => {
					return (
						checkDiet(dish, selectedDiet) &&
						checkAllergens(dish, selectedAllergens)
					)
				})
			)
			// console.log('filteredDishes', filteredDishes)
		})
	}, [
		category,
		company,
		lastDietCheck,
		lastAllergensCheck,
		selectedDiet,
		selectedAllergens,
	])

	if (!data) {
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
