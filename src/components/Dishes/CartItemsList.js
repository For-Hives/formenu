import { useCart } from '@/app/providers/CartProvider'

export function CartItemsList(props) {
	const { itemsInCart } = useCart()
	return (
		<div className={'flex w-full flex-col gap-6'}>
			{itemsInCart?.length ? (
				itemsInCart.map((item, index) => {
					return (
						<div
							key={index}
							className={'flex w-full items-center justify-start'}
						>
							<p>
								{item.name} - {item.price}
							</p>
						</div>
					)
				})
			) : (
				<div className={'flex w-full items-center justify-start'}>
					<p>No items in cart</p>
				</div>
			)}
		</div>
	)
}
