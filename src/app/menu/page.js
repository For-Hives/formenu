import Image from 'next/image'

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
				className={'flex w-full flex-col items-center justify-center gap-10'}
			>
				{data?.data?.map((record, index) => {
					return (
						<button
							className={
								'flex min-h-[50px] w-[235px] items-center gap-8 rounded-lg border-[1.5px] border-blue-950 px-7 py-3.5'
							}
							key={record.id}
						>
							<Image
								src={'/icons/menu_icon.svg'}
								width={20}
								height={20}
								alt={'icon menu'}
								className={'h-auto w-auto'}
							/>
							<span className={'font-medium'}>{record.attributes.title}</span>
						</button>
					)
				})}
			</div>
		</>
	)
}
