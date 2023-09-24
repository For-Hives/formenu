'use client'
import Link from 'next/link'

export async function Nav({ parent_categories }) {
	return (
		<>
			<nav className={'fixed left-0 top-0 h-screen w-screen pb-16 md:pb-0'}>
				<div className={'grid h-full w-full grid-cols-2'}>
					<div className={'col-span-1 flex p-8'}>Logo</div>
					<div
						className={
							'col-span-1 flex flex-col items-end justify-between gap-32 p-8'
						}
					>
						<div>item 1</div>
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
													className={
														'flex h-10 w-10 items-center justify-center rounded-full bg-red-400'
													}
													href={`/${record.id.toString()}`}
												>
													{record.name[0]}
												</Link>
											</div>
										)
									})}
								</>
							}
						</div>
						<div>item 1</div>
					</div>
				</div>
			</nav>
		</>
	)
}
