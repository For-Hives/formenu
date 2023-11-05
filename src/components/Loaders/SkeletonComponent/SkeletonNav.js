import React from 'react'
import { Skeleton } from '@nextui-org/react'

function SkeletonNav() {
	return (
		<div
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
					<Skeleton className={'btn-nav'} />
					<Skeleton className={'btn-nav'} />
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
							<div className={'relative h-full w-0.5 bg-gray-950'}></div>
						</div>
					</div>
					{/* end ------------------------------ underline decoration ------------------------------  */}
					<div
						className={
							'z-30 flex h-2/6 items-start justify-center gap-2 md:gap-4'
						}
					>
						<Skeleton className={'btn-nav'} />
						<Skeleton className={'btn-nav'} />
						<Skeleton className={'btn-nav'} />
					</div>

					<div
						className={
							'relative flex h-4/6 w-full flex-col items-start justify-start gap-8 md:gap-16'
						}
					>
						<div
							className={
								'absolute right-0 top-0 flex w-[40px] flex-col items-center justify-start'
							}
						>
							<div
								style={{
									height: '100%',
								}}
								className={'z-0 w-0.5 bg-gray-950'}
							></div>
							<div className={'z-10 h-screen w-0.5 bg-gray-200'}></div>
						</div>
						{/* ❌ loop on category if it's the first children category */}
						<div className={'flex w-full items-center justify-end'}>
							<Skeleton className={'btn-nav rounded-full'} />
						</div>
						<div className={'flex w-full items-center justify-end'}>
							<Skeleton className={'btn-nav rounded-full'} />
						</div>
						<div className={'flex w-full items-center justify-end'}>
							<Skeleton className={'btn-nav rounded-full'} />
						</div>
						<div className={'flex w-full items-center justify-end'}>
							<Skeleton className={'btn-nav rounded-full'} />
						</div>
						<div className={'flex w-full items-center justify-end'}>
							<Skeleton className={'btn-nav rounded-full'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SkeletonNav
