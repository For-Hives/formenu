import Image from 'next/image'

export function CardBackground({ placementClassName, src, alt }) {
	return (
		<div
			className={`fixed -z-10 h-[75vw] w-[50vw] transform ${placementClassName} opacity-30 grayscale`}
		>
			<div className={'relative h-full w-full'}>
				<Image
					className={'rounded-xl object-cover object-center'}
					src={src ?? '/images/bg_1.jpg'}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					alt={alt ?? 'Background'}
				/>
			</div>
			<div
				className={
					'absolute left-6 top-6 -z-10 h-full w-full rounded-xl border-2 border-slate-950/75'
				}
			/>
		</div>
	)
}
