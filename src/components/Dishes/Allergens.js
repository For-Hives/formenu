import Image from 'next/image'
import { allergens } from '@/enum/allergensData'

export function Allergens({ dish }) {
	return (
		<>
			{allergens.map(allergen => {
				return (
					dish[allergen.key] && (
						<div
							key={allergen.key}
							className={
								'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
							}
						>
							<Image
								src={allergen.src}
								width={20}
								height={20}
								alt={allergen.alt}
							/>
						</div>
					)
				)
			})}
		</>
	)
}
