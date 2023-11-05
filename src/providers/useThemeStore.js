import { create } from 'zustand'

export const useThemeStore = create(set => ({
	theme_color: 'blue',
}))
