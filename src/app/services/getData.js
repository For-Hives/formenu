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
	// console.log('data', data.categories[0].dishes[0])
	return data.categories.filter(
		record => record.id.toString() === category.toString()
	)
}
