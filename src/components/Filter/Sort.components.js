import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import { useFilterStore } from '@/providers/useFilterStore'
import { optionsSortData } from '@/enum/optionsSortData'

export function SortComponents({ content_website_from_company }) {
	const [selectedOptionSort, setSelectedOptionSort] = useState(
		optionsSortData[0].key
	)

	const storeSetSelectedOptionSort = useFilterStore(
		state => state.setSelectedOptionSort
	)

	useEffect(() => {
		storeSetSelectedOptionSort(selectedOptionSort)
	}, [selectedOptionSort])

	return (
		<div
			className={'relative flex h-full w-full items-center justify-start gap-4'}
		>
			<div className="">
				<Menu as="div" className="relative z-50 inline-block text-left">
					<div>
						<Menu.Button
							className={`z-50 inline-flex w-full justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text--${
								content_website_from_company?.color ?? 'blue'
							}-950 underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
						>
							<div className={'flex items-center gap-2 md:gap-4'}>
								<CustomSvgComponents
									url={'/icons/filter.svg'}
									classNames={`!h-[14px] !w-[14px] bg-${
										content_website_from_company?.color ?? 'blue'
									}-950`}
								/>
								<span className={'flex items-center text-xs italic'}>
									Tri:&nbsp;
									{
										optionsSortData.find(
											option => option.key === selectedOptionSort
										).title
									}
								</span>
							</div>
							<div className={'flex h-full items-center'}>
								<ChevronDownIcon
									className="h-4 w-4 md:h-5 md:w-5"
									aria-hidden="true"
								/>
							</div>
						</Menu.Button>
					</div>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
							{optionsSortData.map(option => (
								<Menu.Item key={option.key}>
									{({ active }) =>
										selectedOptionSort === option.key ? (
											<button
												className={`flex w-full items-center gap-3 bg-${
													content_website_from_company?.color ?? 'blue'
												}-950 px-2 py-2 text-sm text-white`}
												onClick={() => setSelectedOptionSort(option.key)}
											>
												{option.title}
											</button>
										) : (
											<button
												className={`${
													active ? 'bg-gray-200 text-gray-900' : 'text-gray-900'
												} flex w-full items-center gap-3 px-2 py-2 text-sm`}
												onClick={() => setSelectedOptionSort(option.key)}
											>
												{option.title}
											</button>
										)
									}
								</Menu.Item>
							))}
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
		</div>
	)
}
