import Image from 'next/image'
import Link from 'next/link'
import { convertStringToKebabCase } from '@/app/utils/utils'

async function getData() {
	let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menus`, {
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

export default async function Page() {
	const data = await getData()

	console.log(data)
	return (
		<>
			<div
				className={
					'flex h-full min-h-[calc(100vh-25rem)] w-full flex-col items-center justify-center gap-8'
				}
			>
				{data?.data?.map((record, index) => {
					return (
						// todo change this to get it from slug
						// 	href={`/menu/${convertStringToKebabCase(
						// 		record.attributes.title
						// 	)}`}
						<Link
							className={
								'flex min-h-[50px] w-[235px] items-center gap-8 rounded-lg border-[1.5px] border-blue-950 bg-slate-50 px-7 py-3.5 text-sm text-blue-950 shadow-lg sm:text-base'
							}
							key={record.id}
							href={`/menu/${encodeURI(record.attributes.title.toString())}`}
						>
							<Image
								src={'/icons/menu_icon.svg'}
								width={20}
								height={20}
								alt={'icon menu'}
								className={'h-auto w-auto'}
							/>
							<span className={'font-medium'}>{record.attributes.title}</span>
						</Link>
					)
				})}
			</div>
		</>
	)
}
