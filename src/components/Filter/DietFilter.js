'use client'
import Image from 'next/image'
import { useState } from 'react'

function DietButton({ diet, selectedDiet, onDietChange }) {
	const isSelected = diet.type === selectedDiet
	return (
		<button
			className={`${
				isSelected ? 'diet-button-selected' : 'diet-button'
			} relative`}
			onClick={() => onDietChange(diet.type)}
		>
			{diet.icon ? (
				<Image src={diet.icon} width={20} height={20} alt={diet.type} />
			) : (
				<span className={'sr-only'}>{diet.type}</span>
			)}

			<span className={'absolute right-0 top-0 m-1'}>
				<div
					className={
						'flex items-center justify-center rounded-full border border-slate-300 bg-slate-50 p-0.5'
					}
				>
					{isSelected ? (
						<div className={'h-1 w-1 rounded-full bg-black/75'}></div>
					) : (
						<div className={'h-1 w-1 rounded-full bg-transparent'}></div>
					)}
				</div>
			</span>
		</button>
	)
}

export function DietFilter() {
	const [selectedDiet, setSelectedDiet] = useState('default')

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{diets.map(diet => (
				<>
					<div
						key={diet.type}
						className={
							'col-span-3 flex flex-col items-center justify-center gap-2'
						}
					>
						<DietButton
							diet={diet}
							selectedDiet={selectedDiet}
							onDietChange={setSelectedDiet}
						/>
						<p
							className={`text-xs text-slate-600 ${
								selectedDiet === diet.type && 'underline'
							}`}
						>
							{diet.type.charAt(0).toUpperCase() + diet.type.slice(1)}
						</p>
					</div>
				</>
			))}
		</div>
	)
}
