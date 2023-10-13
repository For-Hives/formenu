'use client'

import { useState, useEffect } from 'react'
import { getAllData_DishesFromCategory } from '@/services/getData'
import { Dishes } from '@/components/Dishes/Dishes'

const DishesList = ({ category, company }) => {
	const [data, setData] = useState(null)

	useEffect(() => {
		getAllData_DishesFromCategory(category, company).then(result => {
			setData(result)
		})
	}, [category, company])

	if (!data) {
		return <div>Loading...</div>
	}

	return (
		<>
			{data?.dishes.length > 0 && (
				<div className={`container-dishes`}>
					{data?.dishes.map((dish, index) => (
						<Dishes dish={dish} key={dish.id} />
					))}
				</div>
			)}
		</>
	)
}

export default DishesList
