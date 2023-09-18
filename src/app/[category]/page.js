import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'
import { Dishes } from '@/components/Dishes/dishes'

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
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[category]=deep&populate[categories]=deep&populate[dishes][populate][ingredients]=deep&populate[dishes][populate][type_dish][populate][icon]=deep&filters[id][$eq]=${category}`,
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

export default async function Page({ params }) {
	const { category } = params
	const data = await getData(category)
	const data_dishes = await getDataDishes(category)
	const categories = await getCategories()
	const current_category_data = categories.data.filter(
		record => record.id.toString() === category.toString()
	)

	// auto exec
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
			<div className={'container-menu'}>
				<div
					className={`${
						data?.data.length > 0 ? 'min-h-[calc(100vh-25rem)]' : ''
					} container-sub-menus`}
				>
					{/* todo add cool loading */}
					<Suspense fallback={<div>loading</div>}>
						{
							// ✅ get the previous parent category, url
							// from search params, get the previous parent category
							previous_category?.length > 0 && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={'btn-primary'}
										href={`/${previous_category[0]?.id.toString()}`}
									>
										{previous_category[0]?.attributes?.name}
									</Link>
								</div>
							)
						}
						{
							// ✅ get the parent category, url
							<div className={'flex w-full items-center justify-start'}>
								<BackToPrevious
									className={'btn-primary'}
									content={
										current_category_data[0]?.attributes?.name + ' ← retour'
									}
								/>
							</div>
						}
						{data?.data.length > 0 ? (
							<>
								{/* ❌ loop on category if it's the first children category */}
								{data?.data?.map((record, index) => {
									return (
										<div
											key={record.id}
											className={'flex w-full items-center justify-end'}
										>
											<Link
												className={'btn-alt-primary'}
												href={`/${record.id.toString()}`}
											>
												{record.attributes.name}
											</Link>
										</div>
									)
								})}
							</>
						) : (
							// When there is no children categories -> display dishes
							<div
								className={`${
									data_dishes?.data[0]?.attributes.dishes.length > 0
										? 'min-h-[calc(100vh-25rem)]'
										: ''
								} container-dishes`}
							>
								{data_dishes?.data[0]?.attributes.dishes?.data?.map(
									(dish, index) => {
										return (
											<>
												<Dishes dish={dish} />
												{/*<div key={dish.id} className={'btn-alt-primary'}>*/}
												{/*	plats : {dish.attributes.name}*/}
												{/*</div>*/}
											</>
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
						{
							// ✅ get the next parent category
							// from search params, get the next parent category
							next_category?.length > 0 && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={'btn-primary'}
										href={`/${next_category[0]?.id.toString()}`}
									>
										{next_category[0]?.attributes?.name}
									</Link>
								</div>
							)
						}
					</Suspense>
				</div>
			</div>
		</>
	)
}
