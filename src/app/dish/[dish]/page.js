export default function Page({ params }) {
	return (
		<>
			<h3>in dish (sub) - menu param : [{params.menu}]</h3>
			<h3>in dish (sub) - category param : [{params.category}]</h3>
			<h3>in dish (sub) - dish param : [{params.dish}]</h3>
		</>
	)
}
