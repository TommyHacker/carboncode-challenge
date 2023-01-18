const { defineConfig } = require('cypress');

module.exports = defineConfig({
	e2e: {
		supportFile: 'cypress/support/e2e.js',
		specPattern: '**/*.e2e.js',
		setupNodeEvents(on, config) {},
	},
});
