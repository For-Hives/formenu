'use client'

import { useRouter } from 'next/navigation'

export default function BackToPreviousComponents({
	className,
	content = 'Retour',
	children,
	content_website_from_company,
}) {
	const router = useRouter()

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className={
				className ??
				`flex items-center justify-center rounded-lg border border-${
					content_website_from_company?.color ?? 'blue'
				}-950 px-4 py-2 text-center text-${
					content_website_from_company?.color ?? 'blue'
				}-950`
			}
		>
			{children || content}
		</button>
	)
}
