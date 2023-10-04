import Link from 'next/link'
import { CustomSvg } from '@/components/CustomSvg'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/services/getData'

export async function MenusLinks() {
	const data = await getAllData_CategoriesWith0DepthAndSortByOrder()

	return (
		<>
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
		</>
	)
}
