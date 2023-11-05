import React from 'react'
import { Skeleton } from '@nextui-org/react'
import { SkeletonMenu } from '@/components/Loaders/SkeletonComponent/SkeletonMenu'

function SkeletonHome() {
	return (
		<section className={'px-2 py-24 sm:px-4 sm:py-20'}>
			<div className={'flex w-full items-center justify-center gap-4 sm:gap-8'}>
				<Skeleton className={'h-[50px] w-[50px] rounded-full'} />
				<div className={'flex flex-col gap-1 sm:gap-2'}>
					<Skeleton className={'h-[20px] w-[150px] rounded'} />
					<Skeleton className={'ml-4 h-[20px] w-[150px] rounded'} />
				</div>
			</div>
			<div className={'pt-16 sm:pt-20'}>
				<SkeletonMenu />
			</div>
		</section>
	)
}

export default SkeletonHome
