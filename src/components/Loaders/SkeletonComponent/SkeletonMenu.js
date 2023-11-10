import { Skeleton } from '@nextui-org/react'

export function SkeletonMenu() {
	return (
		<div className={'container-menus'}>
			<nav
				className={
					'pointer-events-none fixed left-0 top-0 h-screen w-screen select-none pb-16 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-1'}>
					<div
						className={
							'col-span-1 flex flex-col items-end justify-between gap-32 p-4 md:p-8'
						}
					>
						<div className={'btn-nav'}>
							<Skeleton className={'h-[30px] w-[30px] rounded-full'} />
						</div>
					</div>
				</div>
			</nav>
			<Skeleton className={'btn-alt-primary'} />
			<Skeleton className={'btn-alt-primary'} />
			<Skeleton className={'btn-alt-primary'} />
		</div>
	)
}
