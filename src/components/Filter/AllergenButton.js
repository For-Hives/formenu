import Image from 'next/image'
import { CustomSvg } from '@/components/CustomSvg'

export function AllergenButton({
	allergen,
	selectedAllergens,
	onAllergenToggle,
}) {
	const isSelected = selectedAllergens?.includes(allergen.key)
	return (
		<button
			className={`${
				isSelected ? 'diet-button-selected' : 'diet-button'
			} relative`}
			onClick={() => {
				onAllergenToggle(allergen.key)
			}}
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
							classNames={'!h-[6px] !w-[6px] bg-white'}
						/>
					) : (
						<div className={'h-1 w-1 rounded bg-transparent'}></div>
					)}
				</div>
			</span>
		</button>
	)
}
