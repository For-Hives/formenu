import React from 'react'
import { CustomSvg } from '@/components/CustomSvg'

function Filter(props) {
	return (
		<div
			className={
				'fixed left-0 top-0 z-50 flex h-screen w-screen items-start justify-start bg-black/10 py-4'
			}
		>
			<div
				className={'ml-4 flex w-full flex-col items-end justify-center gap-4'}
			>
				<div
					className={
						'relative flex w-full max-w-lg items-center justify-end shadow-xl'
					}
				>
					<input
						className={
							'flex w-full items-center rounded-l-lg bg-slate-50 py-3 pl-12 text-sm'
						}
						placeholder={'Rechercher un plat avec un mot clé...'}
					></input>
					<CustomSvg
						url={'/icons/magnifying-glass.svg'}
						classNames={
							'ml-5 absolute top-1/2 transform -translate-y-1/2 left-0 h-[15px] w-[15px] bg-black'
						}
					/>
				</div>
				<div
					className={
						'relative flex w-full max-w-lg items-center justify-end shadow-xl'
					}
				>
					<div
						className={
							'flex h-full w-full flex-col gap-8 rounded-l-lg border border-blue-950 bg-slate-50 py-3'
						}
					>
						<div className={'flex gap-4 border-b border-b-slate-200 pb-3 pl-4'}>
							<div className={'flex items-center justify-center'}>
								<CustomSvg
									url={'/icons/filter.svg'}
									classNames={'h-[15px] w-[15px] bg-black'}
								/>
							</div>
							<p className={'text-sm font-bold'}>Filtrer</p>
						</div>
						<div>Regime Alimentaire</div>
						<div>Allergènes</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
