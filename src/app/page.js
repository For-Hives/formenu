import Image from 'next/image'
import Link from 'next/link'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/app/services/getData'
import { CustomSvg } from '@/components/CustomSvg'

export default async function Page() {
	const data = await getAllData_CategoriesWith0DepthAndSortByOrder()

	return (
		<>
			<div className={'container-menus'}>
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
