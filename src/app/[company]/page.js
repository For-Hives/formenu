import { LanguageSwitchComponents } from '@/components/LanguageSwitch.components'
import { MenusLinksComponents } from '@/components/MenusLinks.components'

export default async function Page({ params }) {
	const { company } = params

	return (
		<div className={'container-menus'}>
			<nav
				className={
					'pointer-events-none fixed left-0 top-0 h-screen w-screen select-none pb-16 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-1'}>
					<div
						className={
							'col-span-1 flex flex-col items-end justify-between gap-32 p-4 md:p-8'
						}
					>
						<LanguageSwitchComponents />
					</div>
				</div>
			</nav>
			<MenusLinksComponents company_slug={company} />
		</div>
	)
}
