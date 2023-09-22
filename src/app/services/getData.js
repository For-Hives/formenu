export async function getData() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-menu`, {
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

export async function getAllData() {
	const data = await getData()
	return data
}
