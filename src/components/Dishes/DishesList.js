'use client'

import { useState, useEffect } from 'react'
import { getAllData_DishesFromCategory } from '@/services/getData'
import { Dishes } from '@/components/Dishes/Dishes'
import { useStore } from '@/providers/StoreProvider'

const DishesList = ({ category, company }) => {
	const [data, setData] = useState(null)

	const { checkDiet, checkAllergens } = useStore()

	useEffect(() => {
		getAllData_DishesFromCategory(category, company).then(result => {
			setData(result)
		})
	}, [category, company, checkDiet, checkAllergens])

	if (!data) {
		return <div>Loading...</div>
	}

	// Filtrez les plats en fonction des critères de diet et d'allergens sélectionnés
	const filteredDishes = data?.dishes.filter(
		dish => checkDiet(dish) && checkAllergens(dish)
	)

	return (
		<>
			{filteredDishes.length > 0 ? (
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
