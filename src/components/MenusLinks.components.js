import Link from 'next/link'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/services/getData'

export async function MenusLinksComponents({ company_slug }) {
	const data = await getAllData_CategoriesWith0DepthAndSortByOrder(company_slug)

	return (
		<>
			{data?.map(record => (
				<Link
					className={`btn-alt-primary border-blue-950 text-blue-950`}
					key={record.id}
					href={`/${company_slug}/${record.id}`}
				>
					<CustomSvgComponents
						url={record.icon.url}
						classNames={'bg-blue-950'}
					/>
					<span className={'font-medium'}>{record.name}</span>
				</Link>
			))}
		</>
	)
}
