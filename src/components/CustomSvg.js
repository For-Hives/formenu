export function CustomSvg({ url, classNames }) {
	return (
		<div
			className={`h-[20px] w-[20px] ${classNames}`}
			style={{
				maskImage: `url(${url})`,
				WebkitMaskImage: `url(${url})`,
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
