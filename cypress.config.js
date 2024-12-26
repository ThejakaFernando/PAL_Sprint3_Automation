const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:8000', // Your localhost URL
    specPattern: 'cypress/e2e/**/*.cy.js', // Specifies the pattern for test files
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});
