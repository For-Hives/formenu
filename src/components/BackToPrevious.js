'use client'

import { useRouter } from 'next/navigation'

export default function BackToPrevious({
	className = 'flex items-center justify-center rounded-lg border border-blue-950 px-4 py-2 text-center text-blue-950',
	content = 'Retour',
	children,
}) {
	const router = useRouter()

	return (
		<button type="button" onClick={() => router.back()} className={className}>
			{children || content}
		</button>
	)
}
