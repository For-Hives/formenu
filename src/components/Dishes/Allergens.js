import Image from 'next/image'
import { allergens } from '@/enum/allergensData'

export function Allergens({ dish }) {
	// Check if the dish has any allergens
	const hasAllergens = allergens.some(allergen => dish.allergens[allergen.key])

	return (
		<>
			{hasAllergens ? (
				allergens.map(allergen => {
					return (
						dish.allergens[allergen.key] && (
							<div
								key={allergen.key}
								className="flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-gray-100"
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
				})
			) : (
				<div className="flex w-full items-center justify-center">
					<p className={'text-xs italic text-gray-500'}>
						Aucun allergène particulier
					</p>
				</div>
			)}
		</>
	)
}
