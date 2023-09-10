export default function Page({ params }) {
	console.log(params)
	return (
		<>
			<h3>in menu (sub) - menu param : [{params.menu}]</h3>
			<h3>in menu (sub) - category param : [{params.category}]</h3>
			<h3>in menu (sub) - dish param : [{params.dish}]</h3>
		</>
	)
}
