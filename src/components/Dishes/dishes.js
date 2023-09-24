'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Allergens } from '@/components/Dishes/allergens'

export function Dishes({ dish }) {
	const [isExpanded, setIsExpanded] = useState(false)

	const image = dish?.type_dish?.icon?.url ?? ''

	// border-cyan-500
	return (
		<button
			type="button"
			onClick={() => {
				//	expand this dish
				setIsExpanded(!isExpanded)
			}}
			className={`flex w-full flex-col gap-4 rounded-lg border-l-3 bg-slate-50 p-4 shadow-xl border-${dish?.type_dish?.color}`}
		>
			<div className={'flex w-full items-center justify-between'}>
				<h2 className={'font-bold text-slate-800'}>{dish?.name}</h2>
				{image && (
					<Image
						alt={dish?.name ?? 'icon'}
						src={image}
						width={25}
						height={25}
					/>
				)}
			</div>
			{isExpanded && dish?.description && (
				<div className={'relative flex h-full w-full justify-between gap-6'}>
					<div className={'absolute left-0 top-0 h-full w-full'}>
						<div className={'relative h-full w-5/12 gap-4 bg-red-400'}>
							<Image
								src={dish?.image?.url}
								fill={true}
								alt={dish?.name ?? 'image'}
							/>
						</div>
					</div>
					<div className={'w-5/12'} />
					<div className={'h-full w-7/12'}>
						<p className={'text-start text-sm text-slate-600'}>
							{dish?.description}
						</p>
						<p className={'text-end text-xs italic text-slate-700'}>
							{dish?.price}&nbsp;€
						</p>
					</div>
				</div>
			)}

			<div
				className={`flex h-full items-end justify-between gap-8 pl-4 ${
					isExpanded ? 'py-4' : ''
				}`}
			>
				{dish?.ingredients?.length > 0 && (
					<div>
						<p
							className={`${
								isExpanded
									? 'text-center text-sm font-semibold text-slate-700'
									: 'text-start text-sm text-slate-700'
							} `}
						>
							{/*dish?.attributes?.ingredients?.data*/}
							{dish?.ingredients?.map((ingredient, index) => {
								return (
									<>
										{ingredient?.name}
										{index !== dish?.ingredients?.length - 1 && ', '}
									</>
								)
							})}
						</p>
					</div>
				)}
				{!isExpanded && dish?.price && (
					<div className={'flex h-full flex-col items-end justify-end'}>
						<p className={'text-xs italic text-slate-700'}>
							{dish?.price}&nbsp;€
						</p>
					</div>
				)}
			</div>
			{isExpanded && (
				<div className={'flex flex-col gap-2'}>
					<p className={'text-start text-sm text-slate-700'}>
						Allergènes présents dans le plat :
					</p>
					<div className={'flex flex-wrap justify-evenly gap-2'}>
						<Allergens dish={dish} />
					</div>
				</div>
			)}
		</button>
	)
}
