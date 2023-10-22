'use client'

import { CustomSvg } from '@/components/CustomSvg'
import Image from 'next/image'
import { DietFilter } from '@/components/Filter/DietFilter'
import { AllergensFilter } from '@/components/Filter/AllergensFilter'
import { useStore } from '@/providers/useStore'

function Filter() {
	const isFilterModalClosed = useStore(state => state.isFilterModalClosed)
	const toggleFilterModal = useStore(state => state.toggleFilterModal)
	const resetFilter = useStore(state => state.resetFilter)

	return (
		<div
			className={`${
				isFilterModalClosed
					? 'pointer-events-none -z-10 select-none opacity-0'
					: 'pointer-events-auto z-50 select-auto opacity-100'
			} fixed left-0 top-0 flex min-h-screen w-screen items-start justify-start bg-black/10 backdrop-blur-sm transition-all`}
		>
			<div className={'relative h-full w-full py-4'}>
				<div
					className={'absolute left-0 top-0 h-full w-full'}
					onClick={() => {
						toggleFilterModal()
					}}
				/>
				<div
					className={
						'z-50 ml-4 flex w-full flex-col items-end justify-center gap-4'
					}
				>
					<button
						onClick={() => {
							toggleFilterModal()
						}}
						className={
							'relative flex items-center justify-end rounded-l-lg border border-blue-900 bg-slate-50 px-4 py-3 shadow-xl'
						}
					>
						<div className={'flex items-center justify-center pr-4'}>
							<CustomSvg
								url={'/icons/close.svg'}
								classNames={'h-[10px] w-[10px] bg-black'}
							/>
						</div>
					</button>
					<div
						className={
							'relative flex w-full max-w-lg items-center justify-end shadow-xl'
						}
					>
						<input
							className={
								'flex w-full items-center rounded-l-lg border border-blue-950 bg-slate-50 py-3 pl-12 text-sm'
							}
							placeholder={'Rechercher un plat avec un mot clé...'}
						/>
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
								'relative flex h-full w-full flex-col gap-8 rounded-l-lg border border-blue-950 bg-slate-50 pb-10'
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
										'absolute right-0 top-0 flex h-full w-1/3 items-center justify-end border-l border-slate-300'
									}
								>
									<div className={'flex items-center justify-center pr-10'}>
										<button
											onClick={() => {
												resetFilter()
											}}
											className={'flex items-center gap-2'}
										>
											<span className={'text-xs underline'}>Réinitialiser</span>
											<CustomSvg
												url={'/icons/refresh.svg'}
												classNames={'h-[18px] w-[18px] bg-black'}
											/>
										</button>
									</div>
								</div>
							</div>
							<div className={'flex flex-col items-start justify-center gap-3'}>
								<div className={'flex items-center justify-start gap-3 pl-6'}>
									<Image
										src={'/icons/regime_alimentaire.svg'}
										alt={'regime alimentaire'}
										width={20}
										height={20}
									/>
									<p className={'text-sm font-bold'}>
										Régime alimentaire{' '}
										<span className={'text-xs font-light italic'}>
											(Selectionnez votre régime alimentaire)
										</span>
									</p>
								</div>
							</div>
							<DietFilter />
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
											(Selectionnez les éléments dont vous êtes allergique)
										</span>
									</p>
								</div>
								<AllergensFilter />
							</div>
							<div
								className={
									'absolute -right-4 bottom-0 flex items-center justify-center'
								}
							>
								<button
									onClick={() => {
										toggleFilterModal()
									}}
									className={
										'relative flex items-center justify-end rounded-l-lg  px-4 py-3'
									}
								>
									<div className={'btn-primary flex min-h-[50px] w-full pr-8'}>
										<span className={'text-xs font-semibold text-white'}>
											Appliquer
										</span>
										<CustomSvg
											url={'/icons/check.svg'}
											classNames={'h-[9px] w-[9px] bg-white'}
										/>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Filter
