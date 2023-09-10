import Link from 'next/link'
export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
			<h1 className={'text-7xl text-slate-950'}>ForMenu App</h1>
			<Link
				href={'https://formenu.fr'}
				className={'underline'}
			>{`Site de présentation de l'app`}</Link>
			<Link href={'/menu'} className={'underline'}>
				Voir les menus de la démo →
			</Link>
		</main>
	)
}
