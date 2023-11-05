import { create } from 'zustand'

export const useThemeStore = create(set => ({
	// by default, the theme is set to 'classic', some other themes will be added later
	theme_choice: 'classic',
	// the color of the theme is set to 'blue' by default
	theme_color: 'blue',
	// the title typography of the theme is set to 'Fraunces' by default
	theme_typography_title: 'Fraunces',
	// the body typography of the theme is set to 'Lato' by default
	theme_typography_body: 'Lato',
	// the background by default, is a set of 3 images
	theme_background: [
		'/images/bg_1.jpg',
		'/images/bg_2.jpg',
		'/images/bg_3.jpg',
	],
}))
