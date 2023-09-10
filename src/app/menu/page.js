async function getData() {
	let res = await fetch('https://api.example.com/...')
	// The return value is *not* serialized
	// You can return Date, Map, Set, etc.

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data')
	}

	res = {}
	return res.json()
}

export default function Page() {
	return (
		<>
			<div
				className={'flex w-full flex-col items-center justify-center gap-10'}
			>
				<div>menu page</div>
			</div>
		</>
	)
}
