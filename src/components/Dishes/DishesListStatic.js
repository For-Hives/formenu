import { getAllData_DishesFromCategory } from '@/services/getData'
import { Dishes } from '@/components/Dishes/Dishes'
import { checkIfActivated } from '@/services/checkIfActivated'
import { Suspense } from 'react'
import SkeletonDish from '@/components/Loaders/SkeletonComponent/SkeletonDish'

const DishesListStatic = async ({
	category,
	company,
	content_website_from_company,
}) => {
	const data = await getAllData_DishesFromCategory(category, company)

	return (
		<>
			{data?.dishes.length > 0 ? (
				<div className={`container-dishes`}>
					{data?.dishes.map((dish, index) => {
						return (
							checkIfActivated(dish) && (
								<Dishes
									dish={dish}
									key={dish.id}
									content_website_from_company={content_website_from_company}
								/>
							)
						)
					})}
				</div>
			) : (
				<div className={`container-dishes`}>
					<Suspense fallback={<SkeletonDish />} />
				</div>
			)}
		</>
	)
}

export default DishesListStatic
