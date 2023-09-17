import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'

async function getCategories() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep`,
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

async function getData(category) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[categories]=deep&populate[category]=deep&populate[dishes]=deep&filters[category][id][$eq]=${category}`,
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

async function getDataDishes(category) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[category]=deep&populate[categories]=deep&populate[dishes]=deep&filters[id][$eq]=${category}`,
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

export default async function Page({ params, searchParams }) {
	const { category } = params
	const data = await getData(category)
	const data_dishes = await getDataDishes(category)
	const categories = await getCategories()
	const current_category_data = categories.data.filter(
		record => record.id.toString() === category.toString()
	)

	const previous_category = (() => {
		if (current_category_data[0]?.attributes?.order.toString() === '0')
			return []
		return categories.data.filter(
			record =>
				record.attributes.order.toString() ===
					(current_category_data[0]?.attributes?.order - 1).toString() &&
				record.attributes.depth.toString() ===
					current_category_data[0]?.attributes?.depth.toString()
		)
	})()

	// auto exec
	const next_category = (() => {
		if (
			current_category_data[0]?.attributes?.order.toString() ===
			(categories.data.length - 1).toString()
		)
			return []
		return categories.data.filter(
			record =>
				record.attributes.order.toString() ===
					(current_category_data[0]?.attributes?.order + 1).toString() &&
				record.attributes.depth.toString() ===
					current_category_data[0]?.attributes?.depth.toString()
		)
	})()

	return (
		<>
			<div className={'container-menus'}>
				<Suspense fallback={<div>loading</div>}>
					{data?.data.length > 0 ? (
						<>
							{
								// ✅ get the previous parent category, url
								// from search params, get the previous parent category
								previous_category?.length > 0 && (
									<Link
										className={'btn-primary'}
										href={`/${previous_category[0]?.id.toString()}`}
									>
										{previous_category[0]?.attributes?.name}
									</Link>
								)
							}
							{
								// ✅ get the parent category, url
								<BackToPrevious
									className={'btn-primary'}
									content={current_category_data[0]?.attributes?.name}
								/>
							}
							{/* ❌ loop on category if it's the first children category */}
							{data?.data?.map((record, index) => {
								return (
									<Link
										key={record.id}
										className={'btn-alt-primary'}
										href={`/${record.id.toString()}`}
									>
										{record.attributes.name}
									</Link>
								)
							})}
							{
								// ✅ get the next parent category
								// from search params, get the next parent category
								next_category?.length > 0 && (
									<Link
										className={'btn-primary'}
										href={`/${next_category[0]?.id.toString()}`}
									>
										{next_category[0]?.attributes?.name}
									</Link>
								)
							}
						</>
					) : (
						// When there is no children categories -> display dishes
						<div className={'container-dishes'}>
							{data_dishes?.data[0]?.attributes.dishes?.data?.map(
								(record, index) => {
									return (
										<div key={record.id} className={'btn-alt-primary'}>
											plats : {record.attributes.name}
										</div>
									)
								}
							)}
							<div>
								<div>
									<BackToPrevious />
								</div>
							</div>
						</div>
					)}
				</Suspense>
			</div>
		</>
	)
}
