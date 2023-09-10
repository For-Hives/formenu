export default function Page({ params }) {
	console.log(params)
	return (
		<>
			<h3>in menu - menu param : [{params.menu}]</h3>
			<h3>in menu - category param : [{params.category}]</h3>
			<h3>in menu - dish param : [{params.dish}]</h3>
		</>
	)
}
