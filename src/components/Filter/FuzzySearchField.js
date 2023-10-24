'use client'
import { CustomSvg } from '@/components/CustomSvg'
import Fuse from 'fuse.js'
import { useStore } from '@/providers/useStore'
import { fuze_config } from '@/components/config/fuze_config'

export function FuzzySearchField() {
	const data = useStore(state => state.data)

	const fuse = new Fuse(data, fuze_config)

	return (
		<div
			className={
				'relative flex w-full max-w-lg items-center justify-end shadow-xl'
			}
		>
			<input
				className={
					'flex w-full items-center rounded-l-lg border border-blue-950 bg-slate-50 py-3 pl-12 text-sm'
				}
				placeholder={'Rechercher un plat avec un mot clé...'}
				onClick={() => {
					console.log('clicked')
				}}
				onChange={() => {
					console.log('changed')
				}}
				onKeyDown={() => {
					console.log('keydown')
				}}
			/>
			<CustomSvg
				url={'/icons/magnifying-glass.svg'}
				classNames={
					'ml-5 absolute top-1/2 transform -translate-y-1/2 left-0 h-[15px] w-[15px] bg-black'
				}
			/>
		</div>
	)
}
