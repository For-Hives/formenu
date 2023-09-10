export async function generateStaticParams() {
	return [{ menu: 'menu1' }, { menu: 'menu2' }, { menu: 'menu3' }]
}

export default function Page({ params }) {
	const { menu } = params
	return (
		<>
			<h3>in menu (sub) - menu param : [{params.menu}]</h3>
			<h3>in menu (sub) - category param : [{params.category}]</h3>
			<h3>in menu (sub) - dish param : [{params.dish}]</h3>
		</>
	)
}
