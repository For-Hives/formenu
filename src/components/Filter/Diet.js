import Image from 'next/image'

export function Diet() {
	return (
		<div className={'grid w-full grid-cols-12 gap-2 px-8'}>
			<button
				className={
					'col-span-3 flex items-center justify-center rounded-lg bg-slate-100 py-4'
				}
			>
				<Image src={'/icons/Fish.svg'} width={20} height={20} alt={'elem'} />
			</button>
			<button
				className={
					'col-span-3 flex items-center justify-center rounded-lg bg-slate-100 py-4'
				}
			>
				<Image src={'/icons/Fish.svg'} width={20} height={20} alt={'elem'} />
			</button>
			<button
				className={
					'col-span-3 flex items-center justify-center rounded-lg bg-slate-100 py-4'
				}
			>
				<Image src={'/icons/Fish.svg'} width={20} height={20} alt={'elem'} />
			</button>
			<button
				className={
					'col-span-3 flex items-center justify-center rounded-lg bg-slate-100 py-4'
				}
			>
				<Image src={'/icons/Fish.svg'} width={20} height={20} alt={'elem'} />
			</button>
		</div>
	)
}
