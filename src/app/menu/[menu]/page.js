// export async function generateStaticParams() {
// 	return [{ menu: 'menu1' }, { menu: 'menu2' }, { menu: 'menu3' }]
// }
import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'

async function getData(title) {
	// todo change this to get the menu from the params 'slug' and not from the title
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/api/categories?populate=deep&filters[menu][title][$eq]=${title}`,
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
	const { menu } = params
	console.log(menu)
	const data = await getData(menu)
	console.log(data)
	return (
		<>
			<Suspense fallback={<div>loading</div>}>
				{data?.data.length > 0 ? (
					<>
						{data?.data?.map((record, index) => {
							return <div key={record.id}>→ {record.attributes.name}</div>
						})}
					</>
				) : (
					<div className={'flex flex-col gap-4 '}>
						<p className={''}>{`Il n'y a rien dans ce menu !`}</p>
						<div>
							<BackToPrevious />
						</div>
					</div>
				)}
			</Suspense>
		</>
	)
}
