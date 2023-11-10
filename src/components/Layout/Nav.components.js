import Link from 'next/link'
import Image from 'next/image'
import BackToPreviousComponents from '@/components/BackToPrevious.components'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { UnderlineDecorationComponents } from '@/components/Layout/UnderlineDecoration.components'
import { ShoppingCartButtonResumeComponents } from '@/components/ShoppingCartComponents/ShoppingCartButtonResume.components'
import { ShoppingCartButtonClearComponents } from '@/components/ShoppingCartComponents/ShoppingCartButtonClear.components'
import FilterComponents from '@/components/Filter/Filter.components'
import { ButtonFilterComponents } from '@/components/Layout/ButtonFilter.components'
import { getAllData_FromCompany } from '@/services/getData'

export async function NavComponents({
	parent_categories = null,
	selected_category = null,
	company = null,
	category = null,
	company_slug,
}) {
	const content_website_from_company = await getAllData_FromCompany(company)
	return (
		<>
			<FilterComponents
				category={category}
				company={company}
				content_website_from_company={content_website_from_company}
			/>
			<nav
				className={
					'pointer-events-none fixed left-0 top-0 z-30 h-screen w-screen select-none pb-8 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-2'}>
					<div
						className={
							'col-span-1 flex items-start justify-start gap-2 p-4 sm:gap-4 md:p-8'
						}
					>
						<BackToPreviousComponents
							className={`btn-nav border-${
								content_website_from_company?.color ?? 'blue'
							}-950`}
							content_website_from_company={content_website_from_company}
						>
							<CustomSvgComponents
								url={'/icons/left-arrow.svg'}
								classNames={`!h-[15px] !w-[15px] bg-${
									content_website_from_company?.color ?? 'blue'
								}-950`}
							/>
						</BackToPreviousComponents>
						<Link
							className={`btn-nav border-${
								content_website_from_company?.color ?? 'blue'
							}-950`}
							href={'/'}
						>
							<CustomSvgComponents
								url={'/icons/back.svg'}
								classNames={`!h-[15px] !w-[15px] bg-${
									content_website_from_company?.color ?? 'blue'
								}-950`}
							/>
						</Link>
					</div>
					<div
						className={
							'relative col-span-1 flex flex-col items-end justify-between px-4 pt-4 md:px-8 md:pt-8'
						}
					>
						{/* start ------------------------------ underline decoration ------------------------------  */}
						<div
							className={
								'absolute right-0 top-0 mx-4 flex h-full justify-center md:mx-8'
							}
						>
							<div className={'flex h-full w-[40px] justify-center'}>
								<div
									className={`relative h-full w-0.5 bg-${
										content_website_from_company?.color ?? 'blue'
									}-950`}
								></div>
							</div>
						</div>
						{/* end ------------------------------ underline decoration ------------------------------  */}
						<div
							className={
								'z-30 flex h-2/6 items-start justify-center gap-2 md:gap-4'
							}
						>
							<ShoppingCartButtonClearComponents
								content_website_from_company={content_website_from_company}
							/>
							<ShoppingCartButtonResumeComponents
								content_website_from_company={content_website_from_company}
								company_slug={company_slug}
							/>

							<ButtonFilterComponents
								content_website_from_company={content_website_from_company}
							/>
						</div>
						{
							//     if parent_categories is null, it means that we are on cart page
							parent_categories !== null && selected_category !== null && (
								<div
									className={
										'relative flex h-4/6 w-full flex-col items-start justify-start gap-8 md:gap-16'
									}
								>
									<UnderlineDecorationComponents
										parent_categories={parent_categories}
										selected_category={selected_category}
										content_website_from_company={content_website_from_company}
									/>
									{
										<>
											{/* ❌ loop on category if it's the first children category */}
											{parent_categories.map((record, index) => {
												return (
													<div
														key={record.id}
														className={'flex w-full items-center justify-end'}
													>
														<Link
															className={`${
																selected_category.toString() ===
																record.id.toString()
																	? `btn-nav-alt border-${
																			content_website_from_company?.color ??
																			'blue'
																	  }-950 bg-${
																			content_website_from_company?.color ??
																			'blue'
																	  }-950`
																	: `btn-nav border-${
																			content_website_from_company?.color ??
																			'blue'
																	  }-950`
															}`}
															href={`/${company_slug}/${record.id.toString()}`}
														>
															<CustomSvgComponents
																url={record.icon.url}
																classNames={
																	selected_category.toString() ===
																	record.id.toString()
																		? 'bg-white'
																		: `bg-${
																				content_website_from_company?.color ??
																				'blue'
																		  }-950`
																}
															/>
														</Link>
													</div>
												)
											})}
										</>
									}
								</div>
							)
						}
					</div>
				</div>
			</nav>
		</>
	)
}
