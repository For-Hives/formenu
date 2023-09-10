export default function Page({ params }) {
	console.log(params)
	return (
		<>
			<h3>in category (sub) - menu param : [{params.menu}]</h3>
			<h3>in category (sub) - category param : [{params.category}]</h3>
			<h3>in category (sub) - dish param : [{params.dish}]</h3>
		</>
	)
}
