import React from 'react'
import { CustomSvg } from '@/components/CustomSvg'
import Image from 'next/image'

function Filter() {
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
							'flex h-full w-full flex-col gap-8 rounded-l-lg border border-blue-950 bg-slate-50 pb-10'
						}
					>
						<div
							className={
								'relative flex gap-4 border-b border-b-slate-300 py-3 pl-4'
							}
						>
							<div className={'flex items-center justify-center'}>
								<CustomSvg
									url={'/icons/filter.svg'}
									classNames={'h-[15px] w-[15px] bg-black'}
								/>
							</div>
							<p className={'text-sm font-bold'}>Filtrer</p>
							<div
								className={
									'absolute right-0 top-0 h-full w-1/3 border-l border-slate-300'
								}
							/>
						</div>
						<div className={'flex flex-col items-start justify-center gap-3'}>
							<div className={'flex items-center justify-start gap-3 pl-6'}>
								<Image
									src={'/icons/regime_alimentaire.svg'}
									alt={'regime alimentaire'}
									width={20}
									height={20}
								/>
								<p className={'text-sm font-bold'}>Régime(s) alimentaire(s)</p>
							</div>
						</div>
						<div></div>
						<div className={'flex flex-col items-start justify-center gap-3'}>
							<div className={'flex items-center justify-start gap-3 pl-6'}>
								<Image
									src={'/icons/cereal.svg'}
									alt={'Allergens'}
									width={20}
									height={20}
								/>
								<p className={'text-sm font-bold'}>
									Allergènes{' '}
									<span className={'text-xs font-light italic'}>
										(Selectionnez les éléments que vous souhaitez triés)
									</span>
								</p>
							</div>
							<div></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
