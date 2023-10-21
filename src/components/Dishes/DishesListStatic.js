import { getAllData_DishesFromCategory } from '@/services/getData'
import { Dishes } from '@/components/Dishes/Dishes'

const DishesListStatic = async ({ category, company }) => {
	const data = await getAllData_DishesFromCategory(category, company)

	return (
		<>
			{data?.dishes.length > 0 ? (
				<div className={`container-dishes`}>
					{data?.dishes.map((dish, index) => (
						<Dishes dish={dish} key={dish.id} />
					))}
				</div>
			) : (
				<div className={`container-dishes`}>
					<p className={`text-sm italic`}>
						Aucun plats présent dans cette catégorie
					</p>
				</div>
			)}
		</>
	)
}

export default DishesListStatic
