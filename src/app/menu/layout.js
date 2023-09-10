import Image from 'next/image'

export default function Layout({ children }) {
	return (
		<>
			<section className={'px-4 py-20'}>
				<div className={'flex w-full justify-center gap-8'}>
					<Image
						src={'/icons/logo_restaurant.svg'}
						width={50}
						height={50}
						alt={'logo_restaurant'}
					/>
					<div className={'flex flex-col gap-2'}>
						<h1 className={'formenu-h1'}>{`Les pieds dans l'eau`}</h1>
						<h2 className={'ml-4'}>traditionnel et authentique</h2>
					</div>
				</div>
				<div className={'mt-20'}>
					<h2>Menu Layout</h2>
					{children}
				</div>
			</section>
		</>
	)
}
