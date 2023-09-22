import Image from 'next/image'
import Link from 'next/link'
import { getAllData_CategoriesWith0DepthAndSortByOrder } from '@/app/services/getData'

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
							<Image
								src={'/icons/menu_icon.svg'}
								width={20}
								height={20}
								alt={'icon menu'}
								className={'h-auto w-auto'}
							/>
							<span className={'font-medium'}>{record.name}</span>
						</Link>
					)
				})}
			</div>
		</>
	)
}
