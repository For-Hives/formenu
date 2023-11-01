import React from 'react'
import { Skeleton } from '@nextui-org/react'

function SkeletonDish(props) {
	return (
		<>
			{/* ----------- Container -------------- */}
			<section
				className={`relative my-2 flex w-full items-center justify-center rounded-lg border-l-3 border-cyan-500 bg-slate-50 p-4 shadow-xl`}
			>
				<Skeleton
					className={
						'absolute -right-4 -top-4 z-10 h-[40px] w-[40px] rounded-full'
					}
				/>

				<section className={`flex h-full w-full flex-col gap-4`}>
					<div className={'flex w-full items-center justify-start gap-4'}>
						<Skeleton className={'h-[25px] w-1/3 rounded'} />
					</div>
					<div
						className={`flex h-full w-full items-end justify-between gap-8 pl-4`}
					>
						<Skeleton className={'h-[75px] w-full rounded'} />
						<div className={'flex h-full flex-col items-end justify-end'}>
							<Skeleton className={'h-[20px] w-[25px] rounded'} />
						</div>
					</div>
				</section>
			</section>
		</>
	)
}

export default SkeletonDish
