export function CustomSvg({ url, classNames }) {
	return (
		<div
			className={`h-[15px] w-[15px] ${classNames}`}
			style={{
				mask: `url(${url})`,
				WebkitMask: `url(${url})`,
				maskRepeat: 'no-repeat',
				WebkitMaskRepeat: 'no-repeat',
				maskPosition: 'center',
				WebkitMaskPosition: 'center',
				maskSize: 'contain',
				WebkitMaskSize: 'contain',
			}}
		/>
	)
}
