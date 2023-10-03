import Link from 'next/link'
import Image from 'next/image'

export function ButtonFilter() {
	return (
		<Link href={'/'} className={'btn-nav'}>
			<Image
				src={'/icons/magnifying-glass.svg'}
				alt={'search button'}
				width={15}
				height={15}
			/>
		</Link>
	)
}
