'use client'
import { CustomSvg } from '@/components/CustomSvg'
import Fuse from 'fuse.js'
import { useStore } from '@/providers/useStore'
import { fuze_config } from '@/components/config/fuze_config'
import { useCallback, useEffect, useRef, useState } from 'react'

export function FuzzySearchField() {
	const searchRef = useRef(null)
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState([])
	const [fuse, setFuse] = useState(null)
	const data = useStore(state => state.data)

	const onChange = useCallback(event => {
		const query = event.target.value
		setQuery(query)
		if (query.length) {
			const results = fuse.search(query)
			console.log('results', results)
			setResults(results)
		} else {
			setResults([])
		}
	}, [])

	const onFocus = useCallback(() => {
		setActive(true)
		window.addEventListener('click', onClick)
	}, [])

	const onClick = useCallback(event => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setActive(false)
			window.removeEventListener('click', onClick)
		}
	}, [])

	useEffect(() => {
		if (data && data.length > 0) {
			const fuse = new Fuse(data, fuze_config)
			setFuse(fuse)
		}
	}, [data])

	return (
		<div
			className={
				'relative flex w-full max-w-lg items-center justify-end shadow-xl'
			}
		>
			<input
				className={
					'flex w-full items-center rounded-l-lg border border-blue-950 bg-slate-50 py-3 pl-12 text-sm'
				}
				placeholder={'Rechercher un plat avec un mot clé...'}
				onChange={onChange}
				onFocus={onFocus}
				value={query}
				type="text"
			/>
			<CustomSvg
				url={'/icons/magnifying-glass.svg'}
				classNames={
					'ml-5 absolute top-1/2 transform -translate-y-1/2 left-0 h-[15px] w-[15px] bg-black'
				}
			/>
		</div>
	)
}
