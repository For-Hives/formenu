export async function getContentWebsite() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/content-website?populate=deep`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

async function getData() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/all-company`,
		{
			method: 'GET',
			headers: {
				// 	token
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
			},
		}
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export async function get_data_all(company_id) {
	const data = await getData()

	let companies = data.map(record_company => {
		// get all menus, if menus is empty, return empty array
		let menus = record_company.menus.map(menu => {
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
						company: {
							id: record_company.id,
							slug: record_company.slug,
						},
						allergens: {
							is_allergen_gluten: dish.is_allergen_gluten,
							is_allergen_eggs: dish.is_allergen_eggs,
							is_allergen_fishes: dish.is_allergen_fishes,
							is_allergen_peanuts: dish.is_allergen_peanuts,
							is_allergen_soybeans: dish.is_allergen_soybeans,
							is_allergen_milk: dish.is_allergen_milk,
							is_allergen_nuts: dish.is_allergen_nuts,
							is_allergen_celery: dish.is_allergen_celery,
							is_allergen_mustard: dish.is_allergen_mustard,
							is_allergen_sesams: dish.is_allergen_sesams,
							is_allergen_sulphurous_anhydre:
								dish.is_allergen_sulphurous_anhydre,
							is_allergen_lupins: dish.is_allergen_lupins,
							is_allergen_mollusks: dish.is_allergen_mollusks,
						},
						is_vegetarian: dish.is_vegetarian,
						is_vegan: dish.is_vegan,
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
					company: {
						id: record_company.id,
						slug: record_company.slug,
					},
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
				company: {
					id: record_company.id,
					slug: record_company.slug,
				},
			}
		})
		return {
			id: record_company.id,
			name: record_company.name,
			country: record_company.country,
			city: record_company.city,
			street: record_company.street,
			postcode: record_company.postcode,
			slug: record_company.slug,
			menus: menus,
			logo: record_company.logo,
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

	// filter companies, menus, categories, dishes by company_slug
	if (company_id) {
		companies = companies.filter(
			company => company.id.toString() === company_id.toString()
		)
		menus = menus.filter(
			menu => menu.company.id.toString() === company_id.toString()
		)
		categories = categories.filter(
			category => category.company.id.toString() === company_id.toString()
		)
		dishes = dishes.filter(
			dish => dish.company.id.toString() === company_id.toString()
		)
	}

	return {
		companies: companies,
		menus: menus,
		categories: categories,
		dishes: dishes,
	}
}

async function getIdFromSlug(slug) {
	const data = await get_data_all()
	const company = data.companies.filter(
		record => record.slug.toString() === slug.toString()
	)
	return company[0]?.id
}

// `${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[depth][$eq]=0&sort=order`,
export async function getAllData_CategoriesWith0DepthAndSortByOrder(
	company_slug
) {
	const company_id = await getIdFromSlug(company_slug)
	const data = await get_data_all(company_id)
	// 	filter data.categories, to get all categories with depth = 0 & sort by order
	return data.categories
		.filter(category => category.depth === 0)
		.sort((a, b) => a.order - b.order)
}

export async function get_data_categories(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_data_all(company_id)
	return data.categories
}

export async function get_data_menus(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_data_all(company_id)
	return data.menus
}

export async function get_data_dishes(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_data_all(company_id)
	return data.dishes
}

export async function get_data_companies() {
	let data = await get_data_all()
	return data.companies
}

export async function getAllData_DishesFromCategory(category, company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	const data = await get_data_all(company_id)
	const data_dishes = data.categories.filter(
		record => record.id.toString() === category.toString()
	)
	return data_dishes[0]
}

export async function getCurrentCategoryInfos(categoryId, company_slug) {
	const data = await get_data_categories(company_slug)
	const data_category = data.filter(
		record => record.id.toString() === categoryId.toString()
	)
	return data_category[0]
}

export async function getCategoriesParent(current_category_data, company_slug) {
	if (!current_category_data) return []
	const data = await get_data_categories(company_slug)
	// get the parent category (depth - 1) of current_category_data
	return data.filter(
		record => record.depth.toString() === current_category_data.depth.toString()
	)
}

export async function getPreviousCategoryInfos(
	current_category_data,
	company_slug
) {
	const data = await get_data_categories(company_slug)
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

export async function getNextCategoryInfos(
	current_category_data,
	company_slug
) {
	const data = await get_data_categories(company_slug)
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
