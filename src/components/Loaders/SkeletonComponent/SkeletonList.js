import React from 'react'
import Link from 'next/link'
import { CustomSvg } from '@/components/CustomSvg'
import { DishListStaticOrDynamic } from '@/components/Dishes/DishListStaticOrDynamic'
import DishesListStatic from '@/components/Dishes/DishesListStatic'
import { Skeleton } from '@nextui-org/react'
import SkeletonDish from '@/components/Loaders/SkeletonComponent/SkeletonDish'

function SkeletonList(props) {
	return (
		<div className={'container-menu'}>
			<div className={`container-sub-menus min-h-[calc(100vh-25rem)]`}>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
				<SkeletonDish />
				<SkeletonDish />
				<SkeletonDish />
				<SkeletonDish />
				<SkeletonDish />
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
			</div>
		</div>
	)
}

export default SkeletonList
