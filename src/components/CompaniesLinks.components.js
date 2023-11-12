import Link from 'next/link'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { get_data_companies } from '@/services/getData'

export async function CompaniesLinksComponents() {
	const data = await get_data_companies()

	return (
		<>
			{data?.map(record => {
				return (
					<Link
						className={`btn-alt-primary border-blue-950 text-blue-950`}
						key={record.id}
						href={`/${record.slug}`}
					>
						<CustomSvgComponents
							url={record?.home_image?.url}
							classNames={'bg-blue-950'}
						/>
						<span className={'font-medium'}>{record.name}</span>
					</Link>
				)
			})}
		</>
	)
}
