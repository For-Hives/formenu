import React from 'react'
import Link from 'next/link'
import { CustomSvg } from '@/components/CustomSvg'
import { DishListStaticOrDynamic } from '@/components/Dishes/DishListStaticOrDynamic'
import DishesListStatic from '@/components/Dishes/DishesListStatic'
import { Skeleton } from '@nextui-org/react'

function SkeletonList(props) {
	return (
		<div className={'container-menu'}>
			<div className={`min-h-[calc(100vh-25rem)]`}>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>
				<div className={'flex w-full items-center justify-start'}>
					<Skeleton className={'btn-primary'} />
				</div>

				<div key={record.id} className={'flex w-full items-center justify-end'}>
					<Link
						className={'btn-alt-primary'}
						href={`/${company}/${record.id.toString()}`}
					>
						<CustomSvg url={record.icon.url} classNames={'bg-blue-950'} />
						{record.name}
					</Link>
				</div>
				<DishListStaticOrDynamic
					category={category}
					company={company}
					data={data}
					DishesListStatic={
						<DishesListStatic category={category} company={company} />
					}
				/>
			</div>
		</div>
	)
}

export default SkeletonList
