'use client'
import { CustomSvg } from '@/components/CustomSvg'
import Fuse from 'fuse.js'
import { fuze_config } from '@/components/config/fuze_config'
import { useEffect, useRef, useState } from 'react'
import { getAllData_DishesFromCategory } from '@/services/getData'
import { useStore } from '@/providers/useStore'

export function FuzzySearchField({
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
	const setDataStore = useStore(state => state.setData)
	const setSearchTerms = useStore(state => state.setSearchTerms)
	const searchTerms = useStore(state => state.searchTerms)

	const onChange = e => {
		const query = e.target.value
		setQuery(query)
		if (query.length) {
			if (!fuse) return
			const results = fuse.search(query)
			setResults(results)
		} else {
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
	 * Update data store when data is updated ( filter dishes via fuzejs (fuzzy search) )
	 */
	useEffect(() => {
		const scoredData = { ...data }
		scoredData.dishes = data?.dishes
			.filter(dish => results.some(result => result.item.id === dish.id)) // filter dishes
			.map(dish => ({
				...dish,
				score: results.find(result => result.item.id === dish.id)?.score,
			})) // add score
			.sort((a, b) => a?.score - b?.score) // sort by score

		setSearchTerms(query)
		setDataStore(scoredData?.dishes)
	}, [results])

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
			<CustomSvg
				url={'/icons/magnifying-glass.svg'}
				classNames={`ml-5 absolute top-1/2 transform -translate-y-1/2 left-0 !h-[15px] !w-[15px] bg-${
					content_website_from_company?.color ?? 'blue'
				}-950`}
			/>
		</div>
	)
}
