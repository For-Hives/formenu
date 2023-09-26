import Link from 'next/link'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/app/services/getData'
import { CustomSvg } from '@/components/CustomSvg'
import { LanguageSwitch } from '@/components/LanguageSwitch'

export default async function Page() {
	const data = await getAllData_CategoriesWith0DepthAndSortByOrder()

	return (
		<>
			<div className={'container-menus'}>
				<>
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
								<LanguageSwitch />
							</div>
						</div>
					</nav>
				</>

				{data?.map(record => {
					return (
						<Link
							className={'btn-alt-primary'}
							key={record.id}
							href={`/${record.id}`}
						>
							<CustomSvg url={record.icon.url} classNames={'bg-blue-950'} />
							<span className={'font-medium'}>{record.name}</span>
						</Link>
					)
				})}
			</div>
		</>
	)
}
