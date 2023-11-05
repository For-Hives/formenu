import { create } from 'zustand'

export const useThemeStore = create(set => ({
	// by default, the theme is set to 'classic', some other themes will be added later
	theme_choice: 'classic',
	// the color of the theme is set to 'blue' by default
	theme_color: 'blue',

	theme_typography: '',
	theme_background: [],
}))
