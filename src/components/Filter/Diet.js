'use client'
import Image from 'next/image'
import { useState } from 'react'

function DietButton({ diet, selectedDiet, onDietChange }) {
	const isSelected = diet.type === selectedDiet
	return (
		<>
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
		</>
	)
}

export function Diet() {
	const [selectedDiet, setSelectedDiet] = useState('default')

	const diets = [
		{ type: 'omnivore', icon: '/icons/omnivore.svg' },
		{ type: 'vegetarien', icon: '/icons/vege.svg' },
		{ type: 'vegan', icon: '/icons/vegan.svg' },
		{ type: 'default' },
	]

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{diets.map(diet => (
				<DietButton
					key={diet.type}
					diet={diet}
					selectedDiet={selectedDiet}
					onDietChange={setSelectedDiet}
				/>
			))}
		</div>
	)
}
