'use client'

import { NextUIProvider } from '@nextui-org/react'

export function WrapNextUiProviders({ children }) {
	return <NextUIProvider>{children}</NextUIProvider>
}
