import { getAllData_DishesFromCategory } from '@/services/getData'
import { DishesComponents } from '@/components/Dishes/Dishes.components'
import { checkIfActivated } from '@/services/checkIfActivated'
import { Suspense } from 'react'
import SkeletonDishComponents from '@/components/Skeletons/SkeletonComponent/SkeletonDish.components'

const DishesListStaticComponents = async ({
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
								<DishesComponents
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
					<Suspense fallback={<SkeletonDishComponents />} />
				</div>
			)}
		</>
	)
}

export default DishesListStaticComponents
