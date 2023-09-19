import Image from 'next/image'

export function Allergens({ dish }) {
	// "is_allergen_gluten": null,
	// "is_allergen_shellfishes": false,
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
			{dish?.attributes?.is_allergen_gluten && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/gluten.svg'}
						width={20}
						height={20}
						alt={'gluten'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_shellfishes && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/shellfishes.svg'}
						width={20}
						height={20}
						alt={'shellfishes'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_eggs && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/eggs.svg'}
						width={20}
						height={20}
						alt={'eggs'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_fishes && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/fishes.svg'}
						width={20}
						height={20}
						alt={'fishes'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_peanuts && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/peanuts.svg'}
						width={20}
						height={20}
						alt={'peanuts'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_soybeans && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/soybeans.svg'}
						width={20}
						height={20}
						alt={'soybeans'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_milk && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/milk.svg'}
						width={20}
						height={20}
						alt={'milk'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_nuts && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/nuts.svg'}
						width={20}
						height={20}
						alt={'nuts'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_celery && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100 '
					}
				>
					<Image
						src={'/images/allergens/celery.svg'}
						width={20}
						height={20}
						alt={'celery'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_mustard && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/mustard.svg'}
						width={20}
						height={20}
						alt={'mustard'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_sesams && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/sesams.svg'}
						width={20}
						height={20}
						alt={'sesams'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_sulphurous_anhydre && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/sulphurous_anhydre.svg'}
						width={20}
						height={20}
						alt={'sulphurous_anhydre'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_lupins && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/lupins.svg'}
						width={20}
						height={20}
						alt={'lupins'}
					/>
				</div>
			)}
			{dish?.attributes?.is_allergen_mollusks && (
				<div
					className={
						'flex h-[40px] w-[40px] items-center justify-center rounded-lg bg-slate-100'
					}
				>
					<Image
						src={'/images/allergens/mollusks.svg'}
						width={20}
						height={20}
						alt={'mollusks'}
					/>
				</div>
			)}
		</>
	)
}
