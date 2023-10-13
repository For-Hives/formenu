import { Suspense } from 'react'
import Link from 'next/link'
import {
	getAllData_DishesFromCategory,
	getCategoriesParent,
	getCurrentCategoryInfos,
	getNextCategoryInfos,
	getPreviousCategoryInfos,
} from '@/services/getData'
import { Nav } from '@/components/Layout/Nav'
import { CustomSvg } from '@/components/CustomSvg'
import DishesList from '@/components/Dishes/DishesList'

export default async function Page({ params }) {
	const { category, company } = params
	const data = await getAllData_DishesFromCategory(category, company)
	const current_category_data = await getCurrentCategoryInfos(category, company)
	const previous_category_data = await getPreviousCategoryInfos(
		current_category_data,
		company
	)
	const next_category_data = await getNextCategoryInfos(
		current_category_data,
		company
	)
	const parent_categories = await getCategoriesParent(
		current_category_data,
		company
	)

	return (
		<>
			<Nav
				parent_categories={parent_categories}
				selected_category={current_category_data?.id}
				company_slug={company}
			/>
			<div className={'container-menu'}>
				<div
					className={`${
						data ? 'min-h-[calc(100vh-25rem)]' : ''
					} container-sub-menus`}
				>
					<Suspense fallback={<div>loading</div>}>
						{
							// ✅ get the parent category, url
							<div className={'flex w-full items-center justify-start'}>
								<Link
									className={'btn-primary'}
									href={`/${company}/${current_category_data?.id.toString()}`}
								>
									<CustomSvg
										url={current_category_data?.icon?.url}
										classNames={'bg-white'}
									/>
									{current_category_data?.name}
								</Link>
							</div>
						}
						{current_category_data?.categories.length > 0 ? (
							<>
								{/* ❌ loop on category if it's the first children category */}
								{data.categories.map((record, index) => {
									return (
										<div
											key={record.id}
											className={'flex w-full items-center justify-end'}
										>
											<Link
												className={'btn-alt-primary'}
												href={`/${company}/${record.id.toString()}`}
											>
												<CustomSvg
													url={record.icon.url}
													classNames={'bg-blue-950'}
												/>
												{record.name}
											</Link>
										</div>
									)
								})}
							</>
						) : (
							// When there is no children categories -> display dishes
							<>
								<DishesList category={category} company={company} />
							</>
						)}
					</Suspense>
				</div>
			</div>
		</>
	)
}
