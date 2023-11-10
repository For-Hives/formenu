'use client' // Error components must be Client Components

import Image from 'next/image'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
	useEffect(() => {
		console.log('Error', error)
	}, [error])
	return (
		<html>
			<body>
				<main className="relative isolate z-30 min-h-screen">
					{/* darken */}
					<div
						className={'absolute left-0 top-0 -z-10 h-full w-full bg-black'}
					/>
					<Image
						src="/error_background.png"
						alt="error"
						fill={true}
						className="absolute inset-0 -z-10 h-full w-full object-cover object-left opacity-50"
					/>
					<div className="z-30 mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
						<p className="text-base font-semibold italic leading-8 text-white">
							Oups !
						</p>
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
							Une erreur est survenue
						</h1>
						<p className="mt-4 text-base text-white shadow-lg sm:mt-6">
							Désolé, une erreur est survenue. Veuillez réessayer.
						</p>
						<p className={'text-white shadow-lg'}>
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
			</body>
		</html>
	)
}