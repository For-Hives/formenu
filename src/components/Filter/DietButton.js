import Image from 'next/image'

export function DietButton({ diet, selectedDiet, onDietChange }) {
	const isSelected = diet.key === selectedDiet
	return (
		<button
			className={`${
				isSelected ? 'diet-button-selected' : 'diet-button'
			} relative`}
			onClick={() => {
				onDietChange(diet.key)
			}}
		>
			{diet.url ? (
				<Image src={diet.url} width={20} height={20} alt={diet.key} />
			) : (
				<span className={'sr-only'}>{diet.key}</span>
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
