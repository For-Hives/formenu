export default function Page({ params }) {
	console.log(params)
	return (
		<>
			<h3>in category - menu param : [{params.menu}]</h3>
			<h3>in category - category param : [{params.category}]</h3>
			<h3>in category - dish param : [{params.dish}]</h3>
		</>
	)
}
