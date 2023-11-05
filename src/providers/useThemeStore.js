import { create } from 'zustand'

export const useThemeStore = create(set => ({
	theme_choice: '',
	theme_color: 'blue',
	theme_typography: '',
	theme_background: [],
}))
