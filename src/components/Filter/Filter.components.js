'use client'

import { CustomSvgComponents } from '@/components/CustomSvg.components'
import Image from 'next/image'
import { DietFilterComponents } from '@/components/Filter/DietFilter.components'
import { AllergensFilterComponents } from '@/components/Filter/AllergensFilter.components'
import { useFilterStore } from '@/providers/useFilterStore'
import { FuzzySearchFieldComponents } from '@/components/Filter/FuzzySearchField.components'
import { SortComponents } from '@/components/Filter/Sort.components'

function FilterComponents({ category, company, content_website_from_company }) {
	const isFilterModalClosed = useFilterStore(state => state.isFilterModalClosed)
	const toggleFilterModal = useFilterStore(state => state.toggleFilterModal)
	const resetFilter = useFilterStore(state => state.resetFilter)

	return (
		<div
			className={`${
				isFilterModalClosed
					? 'pointer-events-none -z-10 select-none opacity-0'
					: 'pointer-events-auto z-50 select-auto opacity-100'
			} absolute left-0 top-0 flex h-full w-full items-start justify-start overflow-y-visible bg-black/10 backdrop-blur-sm transition-all`}
		>
			<div className={'relative h-full w-full py-4'}>
				<div
					className={'absolute left-0 top-0 h-full w-full'}
					onClick={() => {
						toggleFilterModal()
					}}
					onKeyUp={() => {
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
						className={'relative flex items-center justify-end py-3'}
					>
						<div className={'flex items-center justify-center'}>
							<div
								className={`btn-primary mr-2 flex min-h-[50px] w-full pr-8 border-${
									content_website_from_company?.color ?? 'blue'
								}-950 bg-${content_website_from_company?.color ?? 'blue'}-950`}
							>
								<span className={'text-xs font-semibold text-white'}>
									Appliquer
								</span>
								<CustomSvgComponents
									url={'/icons/check.svg'}
									classNames={'!h-[12px] !w-[12px] bg-white'}
								/>
							</div>
						</div>
					</button>
					{/* Fuzzy Search Field */}
					<FuzzySearchFieldComponents
						category={category}
						company={company}
						content_website_from_company={content_website_from_company}
					/>
					<div
						className={
							'relative flex w-full max-w-lg items-center justify-end shadow-xl'
						}
					>
						<div
							className={`relative flex h-full w-full flex-col gap-8 rounded-l-lg border border-${
								content_website_from_company?.color ?? 'blue'
							}-950 bg-gray-50 pb-10`}
						>
							<div
								className={
									'relative flex gap-4 border-b border-b-gray-300 py-3 pl-4'
								}
							>
								<SortComponents
									content_website_from_company={content_website_from_company}
								/>

								<div
									className={
										'absolute right-0 top-0 flex h-full w-full items-center justify-end'
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
											<CustomSvgComponents
												url={'/icons/refresh.svg'}
												classNames={`!h-[18px] !w-[18px] bg-${
													content_website_from_company?.color ?? 'blue'
												}-950`}
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
							<DietFilterComponents
								content_website_from_company={content_website_from_company}
							/>
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
								<AllergensFilterComponents
									content_website_from_company={content_website_from_company}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FilterComponents
