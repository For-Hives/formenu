export async function generateStaticParams() {
	return [{ menu: 'menu1' }, { menu: 'menu2' }, { menu: 'menu3' }]
}

export default function Page({ params }) {
	const { menu } = params
	console.log('menu', menu)
	return (
		<>
			<div>menu</div>
		</>
	)
}
