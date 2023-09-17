export function Dishes({ dish }) {
	console.log('dish', dish)
	return (
		<div className={'flex w-full rounded-lg bg-slate-50 pl-3 shadow-xl'}>
			<div className={'flex w-full items-center justify-between'}>
				<h2>{dish.attributes.name}</h2>
				<div>icon</div>
			</div>
		</div>
	)
}
