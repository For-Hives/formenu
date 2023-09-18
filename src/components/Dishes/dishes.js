import Image from 'next/image'

export function Dishes({ dish }) {
	const image =
		dish?.attributes?.type_dish?.data?.attributes?.icon?.data?.attributes
			?.url ?? ''
	console.log(dish?.attributes?.type_dish?.data?.attributes?.color)

	// border-cyan-500
	return (
		<div
			className={`flex w-full rounded-lg border-l-2 bg-slate-50 pl-3 shadow-xl border-${dish?.attributes?.type_dish?.data?.attributes?.color}`}
		>
			<div className={'flex w-full items-center justify-between'}>
				<h2>{dish.attributes.name}</h2>
				{image && (
					<Image
						alt={dish?.attributes?.name ?? 'icon'}
						src={image}
						width={25}
						height={25}
					/>
				)}
			</div>
		</div>
	)
}
