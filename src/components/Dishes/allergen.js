import Image from 'next/image'

export function Allergen({ allergen }) {
	// "is_allergen_gluten": null,
	// "is_allergen_shellfishs": false,
	// "is_allergen_eggs": true,
	// "is_allergen_fishes": false,
	// "is_allergen_peanuts": true,
	// "is_allergen_soybeans": true,
	// "is_allergen_milk": false,
	// "is_allergen_nuts": true,
	// "is_allergen_celery": false,
	// "is_allergen_mustard": false,
	// "is_allergen_sesams": false,
	// "is_allergen_sulphurous_anhydre": false,
	// "is_allergen_lupins": true,
	// "is_allergen_mollusks": false,
	return (
		<>
			{/*  check if allergen is 'is_allergen_gluten' or another value then display the image */}
			{allergen?.attributes?.is_allergen_gluten && (
				<Image
					src={'/images/allergens/gluten.svg'}
					width={20}
					height={20}
					alt={'gluten'}
				/>
			)}
		</>
	)
}
