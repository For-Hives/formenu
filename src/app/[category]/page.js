import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'
import { createSlug } from '@/app/utils/utils'

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

export default async function Page({ params }) {
	const { category } = params
	const data = await getData(category)
	const data_dishes = await getDataDishes(category)

	return (
		<>
			<div className={'container-menus'}>
				<Suspense fallback={<div>loading</div>}>
					{data?.data.length > 0 ? (
						<>
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
						</>
					) : (
						// When there is no data
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
								<p className={''}>{`Il n'y a rien dans ce menu !`}</p>
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
