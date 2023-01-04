/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif']
			},
			colors: {
				'custom-red': '#ff443a',
				'custom-green': '#30d158',
				'custom-blue': '#63e6e2'
			}
		}
	},
	plugins: []
};
