import Image from 'next/image'

export function Dishes({ dish }) {
	const image =
		dish?.attributes?.type_dish?.data?.attributes?.icon?.data?.attributes
			?.url ?? ''
	console.log(dish?.attributes)

	// border-cyan-500
	return (
		<div
			className={`flex w-full flex-col rounded-lg border-l-3 bg-slate-50 p-4 shadow-xl border-${dish?.attributes?.type_dish?.data?.attributes?.color}`}
		>
			<div className={'flex w-full items-center justify-between'}>
				<h2 className={'font-bold text-slate-800'}>{dish.attributes.name}</h2>
				{image && (
					<Image
						alt={dish?.attributes?.name ?? 'icon'}
						src={image}
						width={25}
						height={25}
					/>
				)}
			</div>
			<div className={'flex h-full items-end justify-between gap-8 pl-4'}>
				{dish?.attributes?.description && (
					<div>
						<p className={'text-sm text-slate-700'}>
							{dish?.attributes?.description}
						</p>
					</div>
				)}
				{dish?.attributes?.price && (
					<div className={'flex h-full flex-col items-end justify-end'}>
						<p className={'text-xs italic text-slate-700'}>
							{dish?.attributes?.price}&nbsp;€
						</p>
					</div>
				)}
			</div>
		</div>
	)
}
