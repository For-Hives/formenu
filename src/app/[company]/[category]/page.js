import Link from 'next/link'
import {
	getAllData_DishesFromCategory,
	getAllData_FromCompany,
	getCategoriesParent,
	getCurrentCategoryInfos,
	getNextCategoryInfos,
	getPreviousCategoryInfos,
} from '@/services/getData'
import { NavComponents } from '@/components/Layout/Nav.components'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { DishListStaticOrDynamicComponents } from '@/components/Dishes/DishListStaticOrDynamic.components'
import DishesListStaticComponents from '@/components/Dishes/DishesListStatic.components'
import { Suspense } from 'react'
import { SkeletonContainerComponents } from '@/components/Skeletons/SkeletonPage/SkeletonContainer.components'

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

	const content_website_from_company = await getAllData_FromCompany(
		params.company
	)

	return (
		<Suspense fallback={<SkeletonContainerComponents />}>
			<NavComponents
				parent_categories={parent_categories}
				selected_category={current_category_data?.id}
				company_slug={company}
				company={company}
				category={category}
			/>
			<div className={'container-menu'}>
				<div
					className={`${
						data ? 'min-h-[calc(100vh-25rem)]' : ''
					} container-sub-menus`}
				>
					{
						// ✅ get the previous parent category, url
						// from search params, get the previous parent category
						current_category_data?.categories.length > 0 &&
							previous_category_data && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={`btn-primary border-${
											content_website_from_company?.color ?? 'blue'
										}-950 bg-${
											content_website_from_company?.color ?? 'blue'
										}-950`}
										href={`/${company}/${previous_category_data?.id.toString()}`}
									>
										<CustomSvgComponents
											url={previous_category_data.icon.url}
											classNames={'bg-white'}
										/>
										{previous_category_data?.name}
									</Link>
								</div>
							)
					}
					{
						// ✅ get the parent category, url
						<div className={'flex w-full items-center justify-start'}>
							<Link
								className={`btn-primary border-${
									content_website_from_company?.color ?? 'blue'
								}-950 bg-${content_website_from_company?.color ?? 'blue'}-950`}
								href={`/${company}/${current_category_data?.id.toString()}`}
							>
								<CustomSvgComponents
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
											className={`btn-alt-primary border-${
												content_website_from_company?.color ?? 'blue'
											}-950 text-${
												content_website_from_company?.color ?? 'blue'
											}-950`}
											href={`/${company}/${record.id.toString()}`}
										>
											<CustomSvgComponents
												url={record.icon.url}
												classNames={`bg-${
													content_website_from_company?.color ?? 'blue'
												}-950`}
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
							<DishListStaticOrDynamicComponents
								category={category}
								company={company}
								data={data}
								content_website_from_company={content_website_from_company}
								DishesListStatic={
									<DishesListStaticComponents
										category={category}
										company={company}
										content_website_from_company={content_website_from_company}
									/>
								}
							/>

							{next_category_data && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={`btn-primary border-${
											content_website_from_company?.color ?? 'blue'
										}-950 bg-${
											content_website_from_company?.color ?? 'blue'
										}-950`}
										href={`/${company}/${next_category_data?.id.toString()}`}
									>
										→&nbsp;Voir les {next_category_data?.name}
									</Link>
								</div>
							)}
						</>
					)}
					{
						// ✅ get the next parent category
						// from search params, get the next parent category
						current_category_data?.categories.length > 0 &&
							next_category_data && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={`btn-primary border-${
											content_website_from_company?.color ?? 'blue'
										}-950 bg-${
											content_website_from_company?.color ?? 'blue'
										}-950`}
										href={`/${company}/${next_category_data?.id.toString()}`}
									>
										<CustomSvgComponents
											url={next_category_data.icon.url}
											classNames={'bg-white'}
										/>
										{next_category_data?.name}
									</Link>
								</div>
							)
					}
				</div>
			</div>
		</Suspense>
	)
}
