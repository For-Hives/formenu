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
						className={'btn-alt-primary'}
						key={record.id}
						href={`/${record.id}`}
					>
						<CustomSvg url={record.logo.url} classNames={'bg-blue-950'} />
						<span className={'font-medium'}>{record.name}</span>
					</Link>
				)
			})}
		</>
	)
}
