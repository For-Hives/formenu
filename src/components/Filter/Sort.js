import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { CustomSvg } from '@/components/CustomSvg'

export function Sort() {
	return (
		<>
			<div
				className={
					'relative flex h-full w-full items-center justify-start gap-4'
				}
			>
				<div className="">
					<Menu as="div" className="relative z-50 inline-block text-left">
						<div>
							<Menu.Button className="z-50 inline-flex w-full justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-black underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
								<div className={'flex items-center gap-4'}>
									<CustomSvg
										url={'/icons/filter.svg'}
										classNames={'h-[15px] w-[15px] bg-black'}
									/>
									<p>Trier par</p>
								</div>
								<ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
							<Menu.Items className="absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
								<div className="px-1 py-1">
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? 'bg-blue-500 text-white' : 'text-gray-900'
												} group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
											>
												Mis en avant
											</button>
										)}
									</Menu.Item>
								</div>
								<div className="px-1 py-1">
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? 'bg-blue-500 text-white' : 'text-gray-900'
												} group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
											>
												Prix : Ordre croissant
											</button>
										)}
									</Menu.Item>
								</div>
								<div className="px-1 py-1">
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? 'bg-blue-500 text-white' : 'text-gray-900'
												} group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
											>
												Prix : Ordre décroissant
											</button>
										)}
									</Menu.Item>
								</div>
								<div className="px-1 py-1">
									<Menu.Item>
										{({ active }) => (
											<button
												className={`${
													active ? 'bg-blue-500 text-white' : 'text-gray-900'
												} group flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm`}
											>
												Ordre alphabetique
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</>
	)
}
