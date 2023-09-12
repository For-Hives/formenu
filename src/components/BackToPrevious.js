'use client'

import { useRouter } from 'next/navigation'

export default function BackToPrevious() {
	const router = useRouter()

	return (
		<button
			type="button"
			onClick={() => router.back()}
			className={
				'flex items-center justify-center rounded-lg border border-blue-950 px-4 py-2 text-center text-blue-950'
			}
		>
			Retour
		</button>
	)
}
