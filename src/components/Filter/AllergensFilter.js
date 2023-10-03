'use client'
import Image from 'next/image'
import { useState } from 'react'
import { allergens } from '@/enum/allergensData'
import { CustomSvg } from '@/components/CustomSvg'

function AllergenButton({ allergen, selectedAllergens, onAllergenToggle }) {
	const isSelected = selectedAllergens.includes(allergen.key)
	return (
		<button
			className={`${
				isSelected ? 'diet-button-selected' : 'diet-button'
			} relative`}
			onClick={() => onAllergenToggle(allergen.key)}
		>
			{allergen.src ? (
				<Image src={allergen.src} width={20} height={20} alt={allergen.key} />
			) : (
				<span className={'sr-only'}>{allergen.key}</span>
			)}

			<span className={'absolute right-0 top-0 m-1'}>
				<div
					className={
						'flex items-center justify-center rounded border border-slate-300 bg-transparent p-0.5'
					}
				>
					{isSelected ? (
						<CustomSvg
							url={'/icons/check.svg'}
							classNames={'h-[6px] w-[6px] bg-white'}
						/>
					) : (
						<div className={'h-1 w-1 rounded bg-transparent'}></div>
					)}
				</div>
			</span>
		</button>
	)
}

export function AllergensFilter() {
	const [selectedAllergens, setSelectedAllergens] = useState([])

	const toggleAllergen = key => {
		if (selectedAllergens.includes(key)) {
			setSelectedAllergens(prev => prev.filter(item => item !== key))
		} else {
			setSelectedAllergens(prev => [...prev, key])
		}
	}

	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			{allergens.map(allergen => (
				<div
					className={
						'col-span-3 flex flex-col items-center justify-center gap-2'
					}
					key={allergen.key}
				>
					<AllergenButton
						allergen={allergen}
						selectedAllergens={selectedAllergens}
						onAllergenToggle={toggleAllergen}
					/>
					<p
						className={`text-xs text-slate-600 ${
							selectedAllergens.includes(allergen.key) && 'underline'
						}`}
					>
						{allergen.title.charAt(0).toUpperCase() + allergen.title.slice(1)}
					</p>
				</div>
			))}
		</div>
	)
}
