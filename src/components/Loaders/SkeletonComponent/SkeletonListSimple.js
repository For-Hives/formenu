import React from 'react'
import { Skeleton } from '@nextui-org/react'
import SkeletonDish from '@/components/Loaders/SkeletonComponent/SkeletonDish'

function SkeletonListSimple() {
	return (
		<div className={'container-menu'}>
			<div className={`container-sub-menus min-h-[calc(100vh-25rem)]`}>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
				<div className={`container-dishes`}>
					<SkeletonDish />
					<SkeletonDish />
					<SkeletonDish />
					<SkeletonDish />
					<SkeletonDish />
				</div>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
			</div>
		</div>
	)
}

export default SkeletonListSimple
