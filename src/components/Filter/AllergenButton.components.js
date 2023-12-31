import Image from 'next/image'
import { CustomSvgComponents } from '@/components/CustomSvg.components'

export function AllergenButtonComponents({
	allergen,
	selectedAllergens,
	onAllergenToggle,
	content_website_from_company,
}) {
	const isSelected = selectedAllergens?.includes(allergen.key)
	return (
		<button
			className={`${
				isSelected
					? `diet-button-selected bg-${
							content_website_from_company?.color ?? 'blue'
					  }-950`
					: 'diet-button'
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
						'flex items-center justify-center rounded border border-gray-300 bg-transparent p-0.5'
					}
				>
					{isSelected ? (
						<CustomSvgComponents
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
