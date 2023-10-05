import { LanguageSwitch } from '@/components/LanguageSwitch'
import { MenusLinks } from '@/components/MenusLinks'
import { get_data_companies } from '@/services/getData'
import { CompaniesLinks } from '@/components/CompaniesLinks'

export default async function Page() {
	const data_companies = await get_data_companies()

	return (
		<>
			<div className={'container-menus'}>
				<>
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
								<LanguageSwitch />
							</div>
						</div>
					</nav>
				</>
				<CompaniesLinks />
			</div>
		</>
	)
}
