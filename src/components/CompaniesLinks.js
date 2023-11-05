import Link from 'next/link'
import { CustomSvg } from '@/components/CustomSvg'
import { get_data_companies } from '@/services/getData'

export async function CompaniesLinks() {
	const data = await get_data_companies()

	return (
		<>
			{data?.map(record => {
				return (
					<Link
						className={`btn-alt-primary border-${
							content_website_from_company?.color ?? 'blue'
						}-950 text-${content_website_from_company?.color ?? 'blue'}-950`}
						key={record.id}
						href={`/${record.slug}`}
					>
						<CustomSvg
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
