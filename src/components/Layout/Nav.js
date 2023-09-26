import Link from 'next/link'
import Image from 'next/image'
import BackToPrevious from '@/components/BackToPrevious'
import { CustomSvg } from '@/components/CustomSvg'

export async function Nav({ parent_categories, selected_category }) {
	return (
		<>
			<nav
				className={
					'pointer-events-none fixed left-0 top-0 h-screen w-screen select-none pb-16 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-2'}>
					<div
						className={'col-span-1 flex items-start justify-start p-4 md:p-8'}
					>
						<BackToPrevious className={'btn-nav'}>
							<Image
								src={'/icons/left-arrow.svg'}
								width={15}
								height={15}
								alt={'back'}
							/>
						</BackToPrevious>
					</div>
					<div
						className={
							'col-span-1 flex flex-col items-end justify-between gap-32 p-4 md:p-8'
						}
					>
						<Link href={'/'} className={'btn-nav'}>
							<Image
								src={'/icons/magnifying-glass.svg'}
								alt={'search button'}
								width={15}
								height={15}
							/>
						</Link>
						<div
							className={
								'flex w-full flex-col items-end justify-between gap-16'
							}
						>
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
						<div></div>
					</div>
				</div>
			</nav>
		</>
	)
}
