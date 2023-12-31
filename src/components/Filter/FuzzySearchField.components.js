'use client'
import { CustomSvgComponents } from '@/components/CustomSvg.components'
import Fuse from 'fuse.js'
import { fuze_config } from '../../../config/fuze_config'
import { useEffect, useRef, useState } from 'react'
import { getAllData_DishesFromCategory } from '@/services/getData'
import { useFilterStore } from '@/providers/useFilterStore'

export function FuzzySearchFieldComponents({
	category,
	company,
	content_website_from_company,
}) {
	const searchRef = useRef(null)
	const [query, setQuery] = useState('')
	const [active, setActive] = useState(false)
	const [results, setResults] = useState([])
	const [fuse, setFuse] = useState(null)
	const [data, setData] = useState(null)
	const setDataStore = useFilterStore(state => state.setData)
	const setSearchTerms = useFilterStore(state => state.setSearchTerms)
	const searchTerms = useFilterStore(state => state.searchTerms)

	const onChange = e => {
		const query = e.target.value
		setQuery(query)
		if (query.length) {
			if (!fuse) return
			const results = fuse.search(query)
			setResults(results)
		} else {
			setDataStore(data?.dishes)
			setResults([])
		}
	}

	const onFocus = () => {
		setActive(true)
	}

	const onClick = e => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setActive(false)
		}
	}

	/**
	 * Fetch data from category and company if not already fetched
	 */
	useEffect(() => {
		if (data) return
		if (!category || !company) return
		getAllData_DishesFromCategory(category, company).then(data => {
			const fuse = new Fuse(data.dishes, fuze_config)
			setFuse(fuse)
			setData(data)
		})
	}, [category, company])

	/**
	 * Update data store when data is updated (filter dishes via Fuse.js (fuzzy search))
	 */
	useEffect(() => {
		if (query.length > 0 && results.length > 0) {
			// Only process the search results if there is a query and there are results
			const scoredData = results
				.map(result => ({
					...result.item,
					score: result.score,
				}))
				.sort((a, b) => a.score - b.score) // SortComponents by score

			setDataStore(scoredData)
		} else {
			// If the query is empty, reset the data store to the full list of dishes
			setDataStore(data?.dishes)
		}
		setSearchTerms(query) // This might be redundant if `setQuery` already updates the search terms in the store
	}, [results, query, data?.dishes, setDataStore, setSearchTerms])

	useEffect(() => {
		setQuery(searchTerms)
	}, [searchTerms])

	return (
		<div
			className={
				'relative flex w-full max-w-lg items-center justify-end shadow-xl'
			}
		>
			<input
				className={`flex w-full items-center rounded-l-lg border border-${
					content_website_from_company?.color ?? 'blue'
				}-950 bg-gray-50 py-3 pl-12 text-sm`}
				placeholder={'Rechercher un plat avec un mot clé...'}
				onChange={onChange}
				onFocus={onFocus}
				onClick={onClick}
				value={query}
				type="text"
			/>
			<CustomSvgComponents
				url={'/icons/magnifying-glass.svg'}
				classNames={`ml-5 absolute top-1/2 transform -translate-y-1/2 left-0 !h-[15px] !w-[15px] bg-${
					content_website_from_company?.color ?? 'blue'
				}-950`}
			/>
		</div>
	)
}
