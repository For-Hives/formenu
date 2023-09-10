import Image from 'next/image'

export function CardBackground() {
	return (
		<div
			className={
				'fixed -right-24 -top-48 -z-10 h-[75vw] w-[50vw] rotate-12 transform'
			}
		>
			<div className={'relative h-full w-full'}>
				<Image
					className={'rounded-xl object-cover object-center'}
					src={'/images/bg_1.jpg'}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					alt={'bg_restaurant'}
				/>
			</div>
			<div
				className={
					'absolute left-6 top-6 -z-10 h-full w-full rounded-xl border-4 border-slate-950/10'
				}
			/>
		</div>
	)
}
