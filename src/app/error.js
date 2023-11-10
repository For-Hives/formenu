'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Image from 'next/image'

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	return (
		<main className="relative isolate min-h-screen">
			<Image
				src="/error_background.png"
				alt="error"
				fill={true}
				className="absolute inset-0 -z-10 h-full w-full object-cover object-left"
			/>
			<div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
				<p className="text-base font-semibold leading-8 text-white">erreur</p>
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
					Une erreur est survenue
				</h1>
				<p className="mt-4 text-base text-white/70 sm:mt-6">
					Désolé, une erreur est survenue. Veuillez réessayer.
				</p>
				<p className={'text-white/70'}>
					Ou contactez-nous si le problème persiste.
				</p>
				<div className="mt-10 flex justify-center">
					<button
						className="text-sm font-semibold leading-7 text-white"
						onClick={
							// Attempt to recover by trying to re-render the segment
							() => reset()
						}
					>
						<span aria-hidden="true" className={'text-white'}>
							&larr;
						</span>{' '}
						Revenir en arrière
					</button>
				</div>
			</div>
		</main>
	)
}
