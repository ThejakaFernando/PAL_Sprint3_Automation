// const { defineConfig } = require('cypress');

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter',
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: 'PAL-Sprint-Three',
//     embeddedScreenshots: true,
//     inlineAssets: true,
//     saveAllAttempts: true,
//   },
//   e2e: {
//     baseUrl: 'http://127.0.0.1:8000', // Your localhost URL
//     specPattern: 'cypress/e2e/**/*.cy.js', // Specifies the pattern for test files
//     setupNodeEvents(on, config) {
//       // Implement node event listeners here
//     },
//   },
// });

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'PAL-Sprint-Three',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    reportDir: 'reports', // Specify the folder where reports will be saved
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:8000', // Your localhost URL
    specPattern: 'cypress/e2e/**/*.cy.js', // Specifies the pattern for test files
    setupNodeEvents(on, config) {
      // Register the reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
