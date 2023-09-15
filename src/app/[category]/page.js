// export async function generateStaticParams() {
// 	return [{ menu: 'menu1' }, { menu: 'menu2' }, { menu: 'menu3' }]
// }
import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'

async function getData(category) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[category][id][$eq]=${category}`,
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

async function getLastChildElements(category) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate[categories][category][dishes]=deep&filters[categories][name][$notNull]=false&&filters[category][id]=${category}`,
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
		throw new Error('Failed to fetch data')
	}

	return res.json()
}

export default async function Page({ params }) {
	const { category } = params
	const data = await getData(category)
	const dataLastChild = await getLastChildElements(category)

	if (data?.data.length)
		// search in
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
											href={`/${record.id.toString()}`}
										>
											{record.attributes.name}
										</Link>
									)
								})}
								{/* ✅ loop on category if it's the last children category */}
								{/*{data?.data?.map((record, index) => {*/}
								{/*	return (*/}
								{/*		<Link*/}
								{/*			key={record.id}*/}
								{/*			className={'btn-alt-primary'}*/}
								{/*			href={`/${encodeURI(record.attributes.name.toString())}`}*/}
								{/*		>*/}
								{/*			{record.attributes.name}*/}
								{/*		</Link>*/}
								{/*	)*/}
								{/*})}*/}
								{/* ❓ loop on category if it's no't the last children category (other) */}
								{/*{data?.data?.map((record, index) => {*/}
								{/*	return (*/}
								{/*		<Link*/}
								{/*			key={record.id}*/}
								{/*			className={'btn-alt-primary'}*/}
								{/*			href={`/${encodeURI(record.attributes.name.toString())}`}*/}
								{/*		>*/}
								{/*			{record.attributes.name}*/}
								{/*		</Link>*/}
								{/*	)*/}
								{/*})}*/}
							</>
						) : (
							// When there is no data
							<div className={'flex flex-col gap-4 '}>
								<p className={''}>{`Il n'y a rien dans ce menu !`}</p>
								<div>
									<BackToPrevious />
								</div>
							</div>
						)}
					</Suspense>
				</div>
			</>
		)
}
