/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	safelist: [
		'text-2xl',
		'text-3xl',
		{
			pattern:
				/border-(cyan|yellow|red|indigo|blue|purple|teal|slate|pink|stone)-(100|200|300|400|500|600|700|800|900|950)/,
		},
		{
			pattern:
				/bg-(cyan|yellow|red|indigo|blue|purple|teal|slate|pink|stone)-(100|200|300|400|500|600|700|800|900|950)/,
		},
		{
			pattern: /font-(lato|fraunces)/,
		},
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			rotate: {
				15: '15deg',
				30: '30deg',
			},
			borderWidth: {
				3: '3px',
			},
			fontFamily: {
				lato: 'var(--font-lato)',
				fraunces: 'var(--font-fraunces)',
			},
		},
	},
	darkMode: 'class',
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography'),
		nextui({
			themes: {
				dark: {
					colors: {
						primary: {
							DEFAULT: '#172554',
							foreground: '#000000',
						},
						focus: '#172554',
					},
				},
				light: {
					colors: {
						primary: {
							DEFAULT: '#172554',
							foreground: '#000000',
						},
						focus: '#172554',
					},
				},
			},
		}),
	],
}
