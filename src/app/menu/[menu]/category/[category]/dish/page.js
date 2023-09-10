export default function Page({ params }) {
	console.log(params)
	return (
		<>
			<h3>in dish - menu param : [{params.menu}]</h3>
			<h3>in dish - category param : [{params.category}]</h3>
			<h3>in dish - dish param : [{params.dish}]</h3>
		</>
	)
}
