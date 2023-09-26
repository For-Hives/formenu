'use client'
// get current language in this state
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export function LanguageSwitch() {
	const { locale } = useRouter()
	return (
		<Link
			href={`${
				locale === 'FR'
					? process.env.NEXT_PUBLIC_URL_ALT
					: process.env.NEXT_PUBLIC_URL
			}`}
			className={'btn-nav'}
		>
			<Image
				src={`${
					locale === 'FR'
						? '/icons/flag_united-kingdom.svg'
						: '/icons/flag_france.svg'
				}`}
				alt={`${
					locale === 'FR' ? 'switch to en button' : 'switch to fr button'
				}`}
				width={30}
				height={30}
			/>
		</Link>
	)
}
