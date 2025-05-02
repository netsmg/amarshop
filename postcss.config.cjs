// postcss.config.cjs
const mixins = require('postcss-mixins');

module.exports = {
	plugins: [
		mixins({
			mixinsFiles: ['./src/lib/styles/mixins.css']
		}),
		require('tailwindcss'),
		require('autoprefixer')
	]
};
