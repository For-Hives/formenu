import React from 'react'
import { Skeleton } from '@nextui-org/react'
import SkeletonDishComponents from '@/components/Skeletons/SkeletonComponent/SkeletonDish.components'

function SkeletonListSimpleComponents() {
	return (
		<div className={'container-menu'}>
			<div className={`container-sub-menus min-h-[calc(100vh-25rem)]`}>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
				<div className={`container-dishes`}>
					<SkeletonDishComponents />
					<SkeletonDishComponents />
					<SkeletonDishComponents />
					<SkeletonDishComponents />
					<SkeletonDishComponents />
				</div>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
			</div>
		</div>
	)
}

export default SkeletonListSimpleComponents
