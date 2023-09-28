import { CustomSvg } from '@/components/CustomSvg'

export function ShoppingCart() {
	return (
		<button className={'btn-nav relative'}>
			{/* number of item in the cart */}
			<h4
				className={
					'absolute -right-2 -top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-blue-950 bg-white text-xs font-bold'
				}
			>
				1
			</h4>
			<CustomSvg url={'/icons/shopping.svg'} classNames={'bg-blue-950'} />
		</button>
	)
}
