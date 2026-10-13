import 'server-only'
import { cache } from 'react'
import {
	mapAllCompanyPayload,
	mapContentWebsitePayload,
} from '@/services/menuMappers'

/*
 * SERVER-ONLY MODULE: it holds the API credential and receives raw API data.
 *
 * - `import 'server-only'` makes `next build` fail as soon as this file is
 *   imported, directly or not, by a 'use client' component. Client components
 *   get their data through props, from a server component.
 * - The token is read from API_TOKEN. Never give it a NEXT_PUBLIC_ name:
 *   Next.js writes NEXT_PUBLIC_ variables into the JavaScript sent to browsers.
 * - A raw API response never leaves this file: everything returned goes
 *   through the whitelist mappers of menuMappers.js.
 *
 * `npm run check:leak` verifies these three points.
 */

/**
 * How long (in seconds) Next.js may reuse an API response before asking the
 * API again. Only for what changes rarely: the home page, the branding and the
 * metadata of a company, the links of the company page. The first page
 * requested after this delay still gets the previous response and starts the
 * refresh, the following ones get the new data.
 *
 * The categories and the dishes of the category pages and of the cart are NOT
 * read that way: see getData(true).
 * @private
 */
const API_REVALIDATE_SECONDS = 60

/**
 * Options of every request to the API (credential included)
 * @private
 * @param {boolean} fresh true: ask the API now, false: Next.js may reuse a
 * response for API_REVALIDATE_SECONDS
 * @returns {{method: string, headers: Object, cache: (string|undefined), next: ({revalidate: number}|undefined)}}
 */
function getApiRequestOptions(fresh = false) {
	const token = process.env.API_TOKEN
	if (!token) {
		throw new Error(
			'API_TOKEN is not set: this server-only variable is required to build and to run the app'
		)
	}

	return {
		method: 'GET',
		headers: {
			// 	token
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
		...(fresh
			? { cache: 'no-store' }
			: { next: { revalidate: API_REVALIDATE_SECONDS } }),
	}
}

/**
 * Get all content-website from API
 * /api/content-website?populate=deep
 * @private
 * @returns {Promise<any>}
 */
async function getContentWebsite() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/content-website?populate=deep`,
		getApiRequestOptions()
	)

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

/**
 * Get all content-website from API
 * @public
 * @returns {Promise<{home_title, metadata_description, home_background_images, metadata_title, home_image, home_subtitle}>}
 */
export async function getAllContentWebsite() {
	const data = await getContentWebsite()

	return mapContentWebsitePayload(data)
}

/**
 * Get all data from API
 * @private
 * /api/all-company
 * @param {boolean} fresh false: Next.js may reuse a response for
 * API_REVALIDATE_SECONDS. true: the API is asked while the page is rendered,
 * as the browser used to do on every page view, so that a dish disabled in the
 * back-office is not displayed any more by the next page. Next.js sends a
 * single request to the API per page rendered (same URL, same headers).
 * @returns {Promise<any>}
 */
async function getData(fresh = false) {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/api/all-company`

	if (fresh) {
		const options = getApiRequestOptions(true)
		try {
			const res = await fetch(url, options)
			if (res.ok) return await res.json()
		} catch (error) {
			// an error with a digest is a signal of Next.js, not a failure of the API
			if (error?.digest) throw error
		}
		// The API did not answer: the page is rendered with the response kept by
		// Next.js instead of failing (the page used to stay displayed when the
		// request of the browser failed).
		console.error(
			'Failed to fetch fresh data from /api/all-company, using the cached response'
		)
	}

	const res = await fetch(url, getApiRequestOptions())

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

/**
 * Get all data from API, mapped to whitelisted objects.
 * cache() shares the result between the calls made, with the same arguments,
 * while one request is rendered.
 * @private
 * @param company_id
 * @param {boolean} fresh see getData()
 * @returns {Promise<{companies: *[], dishes: *[], menus: *[], categories: *[]}>}
 */
const getMappedData = cache(async (company_id, fresh) => {
	const data = await getData(fresh)

	// companies, menus, categories, dishes: all of them, or those of company_id
	return mapAllCompanyPayload(data, company_id)
})

/**
 * Get all data from API
 * @public
 * @param company_id
 * @returns {Promise<{companies: *, dishes: *[], menus: *[], categories: *[]}>}
 */
export async function get_data_all(company_id) {
	return getMappedData(company_id, false)
}

/**
 * Get all data from API, without the cache of Next.js: for the categories and
 * the dishes displayed by the category pages and by the cart.
 * @private
 * @param company_id
 * @returns {Promise<{companies: *, dishes: *[], menus: *[], categories: *[]}>}
 */
async function get_fresh_data_all(company_id) {
	return getMappedData(company_id, true)
}

/**
 * Get company id from slug for company
 * @private
 * @param slug
 * @returns {Promise<*>}
 */
async function getIdFromSlug(slug) {
	const data = await get_data_all()
	const company = data.companies.filter(
		record => record.slug.toString() === slug.toString()
	)
	// check if company exist if not throw error
	if (!company[0]) {
		throw new Error('Company not found')
	}
	return company[0]?.id
}

/**
 * Get all data categories with depth = 0 & sort by order
 * @public
 * @param company_slug
 * @returns {Promise<*[]>}
 */
export async function getAllData_CategoriesWith0DepthAndSortByOrder(
	company_slug
) {
	const company_id = await getIdFromSlug(company_slug)
	const data = await get_data_all(company_id)
	// check if data exist if not throw error
	if (!data.categories) {
		throw new Error('Categories not found')
	}
	// 	filter data.categories, to get all categories with depth = 0 & sort by order
	return data.categories
		.filter(category => category.depth === 0)
		.sort((a, b) => a.order - b.order)
}

/**
 * all data from company, companies elements
 * @public
 * @param company_slug
 * @returns {Promise<*>}
 */
export async function getAllData_FromCompany(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	const data = await get_data_all(company_id)
	// check if data exist if not throw error
	if (!data.companies) {
		throw new Error('Companies not found')
	}
	return data.companies[0]
}

/**
 * Get all categories from company (category pages: not cached, so that they
 * come from the same API response as the dishes displayed with them)
 * @public
 * @param company_slug
 * @returns {Promise<*[]>}
 */
export async function get_data_categories(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_fresh_data_all(company_id)
	// check if data exist if not throw error
	if (!data.categories) {
		throw new Error('Categories not found')
	}
	return data.categories
}

/**
 * Get all data from company
 * @public
 * @param company_slug
 * @returns {Promise<*[]>}
 */
export async function get_data_menus(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_data_all(company_id)
	// check if data exist if not throw error
	if (!data.menus) {
		throw new Error('Menus not found')
	}
	return data.menus
}

/**
 * Get all dishes from company (cart: not cached)
 * @public
 * @param company_slug
 * @returns {Promise<*[]>}
 */
export async function get_data_dishes(company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	let data = await get_fresh_data_all(company_id)
	// check if data exist if not throw error
	if (!data.dishes) {
		throw new Error('DishesComponents not found')
	}
	return data.dishes
}

/**
 * Get all companies
 * @public
 * @returns {Promise<*>}
 */
export async function get_data_companies() {
	let data = await get_data_all()
	// check if data exist if not throw error
	if (!data.companies) {
		throw new Error('Companies not found')
	}
	return data.companies
}

/**
 * Get all data dishes from category (dish list, search field: not cached)
 * @public
 * @param category
 * @param company_slug
 * @returns {Promise<*>}
 */
export async function getAllData_DishesFromCategory(category, company_slug) {
	const company_id = await getIdFromSlug(company_slug)
	const data = await get_fresh_data_all(company_id)
	const data_dishes = data.categories.filter(
		record => record.id.toString() === category.toString()
	)
	// check if data exist if not throw error
	if (!data_dishes) {
		throw new Error('DishesComponents not found')
	}
	return data_dishes[0]
}

/**
 * Get all data categories from current category
 * @param categoryId
 * @param company_slug
 * @returns {Promise<*>}
 */
export async function getCurrentCategoryInfos(categoryId, company_slug) {
	const data = await get_data_categories(company_slug)
	const data_category = data.filter(
		record => record.id.toString() === categoryId.toString()
	)
	// check if data exist if not throw error
	if (!data_category) {
		throw new Error('Category not found')
	}
	return data_category[0]
}

/**
 * Get all data categories from parent category
 * @public
 * @param current_category_data
 * @param company_slug
 * @returns {Promise<*[]>}
 */
export async function getCategoriesParent(current_category_data, company_slug) {
	if (!current_category_data) return []
	const data = await get_data_categories(company_slug)
	// check if data exist if not throw error
	if (!data) {
		throw new Error('Categories not found')
	}
	// get the parent category (depth - 1) of current_category_data
	return data.filter(
		record => record.depth.toString() === current_category_data.depth.toString()
	)
}

/**
 * Get all data categories from previous category
 * @public
 * @param current_category_data
 * @param company_slug
 * @returns {Promise<*>}
 */
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
	// check if data exist if not throw error
	if (!previous_category) {
		throw new Error('Category not found')
	}
	return previous_category[0]
}

/**
 * Get all data categories from next category
 * @public
 * @param current_category_data
 * @param company_slug
 * @returns {Promise<*>}
 */
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
	// check if data exist if not throw error
	if (!next_category) {
		throw new Error('Category not found')
	}
	return next_category[0]
}
