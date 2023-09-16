import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'
import { createSlug } from '@/app/utils/utils'

async function getCategories() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
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
	const previous_category_data = categories.data.filter(
		record => record?.id?.toString() === searchParams.p?.toString()
	)
	const next_category_data = categories.data.filter(
		record => record?.id?.toString() === searchParams.n?.toString()
	)

	return (
		<>
			<div className={'container-menus'}>
				<Suspense fallback={<div>loading</div>}>
					{data?.data.length > 0 ? (
						<>
							{
								// ✅ get the previous parent category, url
								// from search params, get the previous parent category
								previous_category_data?.length > 0 && (
									<Link
										className={'btn-primary'}
										href={`/${previous_category_data[0]?.id.toString()}`}
									>
										{previous_category_data[0]?.attributes?.name}
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
										href={createSlug(data, record, index)}
									>
										{record.attributes.name}
									</Link>
								)
							})}
							{
								// ✅ get the next parent category
								// from search params, get the next parent category
								next_category_data?.length > 0 && (
									<Link
										className={'btn-primary'}
										href={`/${next_category_data[0]?.id.toString()}`}
									>
										{next_category_data[0]?.attributes?.name}
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
