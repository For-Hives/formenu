function getData() {
	const res = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-company`, {
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

export async function get_data_all() {
	const data = await getData()
	const companies = data.map(record => {
		let menus = record.menus.map(menu => {
			let categories = menu.categories.map(category => {
				let dishes = category.dishes.map(dish => {
					return {
						id: dish.id,
						name: dish.name,
						description: dish.description,
						price: dish.price,
						ingredients: dish.ingredients,
						attributes: dish.attributes,
						image: dish.image,
						type_dish: dish.type_dish,
						category: dish.category,
					}
				})
				return {
					id: category.id,
					name: category.name,
					order: category.order,
					depth: category.depth,
					icon: category.icon,
					category: category.category,
					categories: category.categories,
					dishes: dishes,
				}
			})
			return {
				id: menu.id,
				title: menu.title,
				description: menu.description,
				activated: menu.activated,
				color: menu.color,
				fonts: menu.fonts,
				image: menu.image,
				categories: categories,
			}
		})
		return {
			id: record.id,
			name: record.name,
			country: record.country,
			city: record.city,
			street: record.street,
			postcode: record.postcode,
			menus: menus,
			logo: record.logo,
		}
	})

	// get all dishes
	let dishes = []
	companies.forEach(company => {
		company.menus.forEach(menu => {
			menu.categories.forEach(category => {
				category.dishes.forEach(dish => {
					dishes.push(dish)
				})
			})
		})
	})

	// get all categories
	let categories = []
	companies.forEach(company => {
		company.menus.forEach(menu => {
			menu.categories.forEach(category => {
				categories.push(category)
			})
		})
	})

	// get all menus
	let menus = []
	companies.forEach(company => {
		company.menus.forEach(menu => {
			menus.push(menu)
		})
	})

	return {
		companies: companies,
		menus: menus,
		categories: categories,
		dishes: dishes,
	}
}

// `${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[depth][$eq]=0&sort=order`,
export async function getAllData_CategoriesWith0DepthAndSortByOrder() {
	const data = await get_data_all()
	// 	filter data.categories, to get all categories with depth = 0 & sort by order
	return data.categories
		.filter(category => category.depth === 0)
		.sort((a, b) => a.order - b.order)
}

export async function get_data_categories() {
	let data = await get_data_all()
	return data.categories
}

export async function get_data_menus() {
	let data = await get_data_all()
	return data.menus
}

export async function get_data_dishes() {
	let data = await get_data_all()
	return data.dishes
}

export async function get_data_companies() {
	let data = await get_data_all()
	return data.companies
}

export async function getAllData_DishesFromCategory(category) {
	const data = await get_data_all()
	const data_dishes = data.categories.filter(
		record => record.id.toString() === category.toString()
	)
	return data_dishes[0]
}

export async function getCurrentCategoryInfos(categoryId) {
	const data = await get_data_categories()
	const data_category = data.filter(
		record => record.id.toString() === categoryId.toString()
	)
	return data_category[0]
}

export async function getCategoriesParent(current_category_data) {
	const data = await get_data_categories()
	// get the parent category (depth - 1) of current_category_data
	return data.filter(
		record =>
			record.depth.toString() === (current_category_data?.depth).toString()
	)
}

export async function getPreviousCategoryInfos(current_category_data) {
	const data = await get_data_categories()
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

export async function getNextCategoryInfos(current_category_data) {
	const data = await get_data_categories()
	const next_category = (() => {
		if (
			current_category_data?.order.toString() === (data.length - 1).toString()
		)
			return []
		return data.filter(
			record =>
				record.order.toString() ===
					(current_category_data?.order + 1).toString() &&
				record.depth.toString() === current_category_data?.depth.toString()
		)
	})()
	return next_category[0]
}
