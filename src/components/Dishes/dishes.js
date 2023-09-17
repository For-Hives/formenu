import Image from 'next/image'

export function Dishes({ dish }) {
	const image =
		dish?.attributes?.type_dish?.data?.attributes?.icon?.data?.attributes
			?.url ?? ''
	console.log(image ?? '')
	return (
		<div className={'flex w-full rounded-lg bg-slate-50 pl-3 shadow-xl'}>
			<div className={'flex w-full items-center justify-between'}>
				<h2>{dish.attributes.name}</h2>
				{image && (
					<Image
						alt={dish?.attributes?.name ?? 'icon'}
						src={image}
						width={25}
						height={25}
					></Image>
				)}
			</div>
		</div>
	)
}
