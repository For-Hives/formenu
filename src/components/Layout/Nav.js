import Link from 'next/link'
import Image from 'next/image'
import BackToPrevious from '@/components/BackToPrevious'
import { CustomSvg } from '@/components/CustomSvg'
import { UnderlineDecoration } from '@/components/Layout/UnderlineDecoration'
import { ShoppingCart } from '@/components/Layout/ShoppingCart'

export async function Nav({ parent_categories, selected_category }) {
	return (
		<>
			<nav
				className={
					'pointer-events-none fixed left-0 top-0 z-10 h-screen w-screen select-none pb-8 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-2'}>
					<div
						className={
							'col-span-1 flex items-start justify-start gap-2 p-4 sm:gap-4 md:p-8'
						}
					>
						<BackToPrevious className={'btn-nav'}>
							<Image
								src={'/icons/left-arrow.svg'}
								width={15}
								height={15}
								alt={'back'}
							/>
						</BackToPrevious>
						<Link className={'btn-nav'} href={'/'}>
							<Image
								src={'/icons/back.svg'}
								width={15}
								height={15}
								alt={'back'}
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
								<div className={'relative h-full w-0.5 bg-slate-950'}></div>
							</div>
						</div>
						{/* end ------------------------------ underline decoration ------------------------------  */}
						<div
							className={'flex h-2/6 items-start justify-center gap-2 md:gap-4'}
						>
							<ShoppingCart />
							<Link href={'/'} className={'btn-nav'}>
								<Image
									src={'/icons/magnifying-glass.svg'}
									alt={'search button'}
									width={15}
									height={15}
								/>
							</Link>
						</div>
						<div
							className={
								'relative flex h-4/6 w-full flex-col items-start justify-start gap-8 md:gap-16'
							}
						>
							<UnderlineDecoration
								parent_categories={parent_categories}
								selected_category={selected_category}
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
															? 'btn-nav-alt'
															: 'btn-nav'
													}`}
													href={`/${record.id.toString()}`}
												>
													<CustomSvg
														url={record.icon.url}
														classNames={
															selected_category.toString() ===
															record.id.toString()
																? 'bg-white'
																: 'bg-black'
														}
													/>
												</Link>
											</div>
										)
									})}
								</>
							}
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
