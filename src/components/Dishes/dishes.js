'use client'
import Image from 'next/image'
import { useState } from 'react'

export function Dishes({ dish }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const image =
		dish?.attributes?.type_dish?.data?.attributes?.icon?.data?.attributes
			?.url ?? ''

	// border-cyan-500
	return (
		<button
			type="button"
			onClick={() => {
				//	expand this dish
				setIsExpanded(!isExpanded)
			}}
			className={`flex w-full flex-col gap-4 rounded-lg border-l-3 bg-slate-50 p-4 shadow-xl border-${dish?.attributes?.type_dish?.data?.attributes?.color}`}
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
			{isExpanded && dish?.attributes?.description && (
				<div className={'relative flex h-full w-full justify-between gap-6'}>
					<div className={'absolute left-0 top-0 h-full w-full'}>
						<div className={'relative h-full w-5/12 gap-4 bg-red-400'}>
							<Image
								src={dish?.attributes?.image?.data?.attributes?.url}
								fill={true}
								alt={dish?.attributes?.name ?? 'image'}
							/>
						</div>
					</div>
					<div className={'w-5/12'} />
					<div className={'h-full w-7/12'}>
						<p className={'text-start text-sm text-slate-600'}>
							{dish?.attributes?.description}
						</p>
						<p className={'text-end text-xs italic text-slate-700'}>
							{dish?.attributes?.price}&nbsp;€
						</p>
					</div>
				</div>
			)}

			<div className={'flex h-full items-end justify-between gap-8 pl-4'}>
				{dish?.attributes?.ingredients?.data?.length > 0 && (
					<div>
						<p
							className={`${
								isExpanded
									? 'text-center text-sm font-semibold text-slate-700'
									: 'text-start text-sm text-slate-700'
							} `}
						>
							{/*dish?.attributes?.ingredients?.data*/}
							{dish?.attributes?.ingredients?.data?.map((ingredient, index) => {
								return (
									<>
										{ingredient?.attributes?.name}
										{index !==
											dish?.attributes?.ingredients?.data?.length - 1 && ', '}
									</>
								)
							})}
						</p>
					</div>
				)}
				{!isExpanded && dish?.attributes?.price && (
					<div className={'flex h-full flex-col items-end justify-end'}>
						<p className={'text-xs italic text-slate-700'}>
							{dish?.attributes?.price}&nbsp;€
						</p>
					</div>
				)}
			</div>
		</button>
	)
}
