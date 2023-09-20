export function Nav() {
	return (
		<>
			<nav
				className={
					'fixed left-0 top-0 h-screen w-screen bg-gray-200 pb-16 md:pb-0'
				}
			>
				<div className={'grid h-full w-full grid-cols-2'}>
					<div className={'col-span-1 flex bg-gray-400 p-8'}>Logo</div>
					<div
						className={
							'col-span-1 flex flex-col items-end justify-start gap-32 bg-gray-500 p-8'
						}
					>
						<div>item 1</div>
						<div className={'flex w-full flex-col items-end gap-16'}>
							<div>item 1</div>
							<div>item 1</div>
							<div>item 1</div>
							<div>item 1</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	)
}
