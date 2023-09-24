export async function getData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-menu`, {
		method: 'GET',
		headers: {
			// 	token
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
		},
	})

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export async function getAllData() {
	const data = await getData()
	return data[0]
}

// `${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[depth][$eq]=0&sort=order`,
export async function getAllData_CategoriesWith0DepthAndSortByOrder() {
	const data = await getAllData()
	// 	filter data.categories, to get all categories with depth = 0 & sort by order
	return data.categories
		.filter(category => category.depth === 0)
		.sort((a, b) => a.order - b.order)
}

export async function getAllData_Categories() {
	const data = await getAllData()
	return data.categories
}

// categories?populate[categories]=deep&populate[category]=deep&populate[dishes]=deep&filters[category][id][$eq]=${category}
export async function getAllData_DishesFromCategory(category) {
	const data = await getAllData()
	const data_dishes = data.categories.filter(
		record => record.id.toString() === category.toString()
	)
	return data_dishes[0]
}

export async function getCurrentCategoryInfos(categoryId) {
	const data = await getAllData_Categories()
	const data_category = data.filter(
		record => record.id.toString() === categoryId.toString()
	)
	return data_category[0]
}

export async function getPreviousCategoryInfos(current_category_data) {
	const data = await getAllData_Categories()
	const previous_category = (() => {
		if (current_category_data?.order.toString() === '0') return []
		return data.filter(
			record =>
				record.order.toString() ===
					(current_category_data?.order - 1).toString() &&
				record.depth.toString() === current_category_data?.depth.toString()
		)
	})()
	return previous_category[0]
}
// // auto exec
// const previous_category = (() => {
// 	if (current_category_data[0]?.order.toString() === '0') return []
// 	return categories.filter(
// 		record =>
// 			record.order.toString() ===
// 				(current_category_data[0]?.order - 1).toString() &&
// 			record.depth.toString() === current_category_data[0]?.depth.toString()
// 	)
// })()

// auto exec
const next_category = (() => {
	if (
		current_category_data[0]?.order.toString() ===
		(categories.length - 1).toString()
	)
		return []
	return categories.filter(
		record =>
			record.order.toString() ===
				(current_category_data[0]?.order + 1).toString() &&
			record.depth.toString() === current_category_data[0]?.depth.toString()
	)
})()
