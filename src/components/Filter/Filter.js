import React from 'react'
import { CustomSvg } from '@/components/CustomSvg'

function Filter(props) {
	return (
		<div
			className={
				'fixed left-0 top-0 z-50 flex h-screen w-screen items-start justify-start bg-black/10 py-4'
			}
		>
			<div className={'flex w-full items-center justify-end'}>
				<div
					className={'relative flex w-full max-w-lg items-center justify-end'}
				>
					<input
						className={
							'ml-4 flex w-full items-center rounded-l-lg bg-slate-50 py-3 pl-12 shadow-xl'
						}
						placeholder={'Rechercher un plat avec un mot clé...'}
					></input>
					<CustomSvg
						url={'/icons/magnifying-glass.svg'}
						classNames={
							'ml-9 absolute top-1/2 transform -translate-y-1/2 left-0 h-[15px] w-[15px] bg-black'
						}
					></CustomSvg>
				</div>
			</div>
		</div>
	)
}

export default Filter
