import { Suspense } from 'react'
import BackToPrevious from '@/components/BackToPrevious'
import Link from 'next/link'
import { Dishes } from '@/components/Dishes/dishes'
import {
	getAllData_Categories,
	getAllData_DishesFromCategory,
	getCurrentCategoryInfos,
	getNextCategoryInfos,
	getPreviousCategoryInfos,
} from '@/app/services/getData'

export default async function Page({ params }) {
	const { category } = params
	const data = await getAllData_DishesFromCategory(category)
	const current_category_data = await getCurrentCategoryInfos(category)
	const previous_category_data = await getPreviousCategoryInfos(
		current_category_data
	)
	const next_category_data = await getNextCategoryInfos(current_category_data)

	return (
		<>
			<div className={'container-menu'}>
				<div
					className={`${
						data?.length > 0 ? 'min-h-[calc(100vh-25rem)]' : ''
					} container-sub-menus`}
				>
					{/* todo add cool loading */}
					<Suspense fallback={<div>loading</div>}>
						{
							// ✅ get the previous parent category, url
							// from search params, get the previous parent category
							previous_category_data?.length > 0 && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={'btn-primary'}
										href={`/${previous_category_data[0]?.id.toString()}`}
									>
										{previous_category_data[0]?.name}
									</Link>
								</div>
							)
						}
						{
							// ✅ get the parent category, url
							<div className={'flex w-full items-center justify-start'}>
								<BackToPrevious
									className={'btn-primary'}
									content={current_category_data[0]?.name + ' ← retour'}
								/>
							</div>
						}
						{data ? (
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
												href={`/${record.id.toString()}`}
											>
												{record.name}
											</Link>
										</div>
									)
								})}
							</>
						) : (
							// When there is no children categories -> display dishes
							<div
								className={`${
									data.dishes.length > 0 ? 'min-h-[calc(100vh-25rem)]' : ''
								} container-dishes`}
							>
								{data?.dishes.map((dish, index) => {
									return (
										<>
											<Dishes dish={dish} />
										</>
									)
								})}
								<div>
									<div>
										<BackToPrevious />
									</div>
								</div>
							</div>
						)}
						{
							// ✅ get the next parent category
							// from search params, get the next parent category
							next_category_data?.length > 0 && (
								<div className={'flex w-full items-center justify-start'}>
									<Link
										className={'btn-primary'}
										href={`/${next_category_data?.id.toString()}`}
									>
										{next_category_data?.name}
									</Link>
								</div>
							)
						}
					</Suspense>
				</div>
			</div>
		</>
	)
}
