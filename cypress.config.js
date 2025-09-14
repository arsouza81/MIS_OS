const { defineConfig } = require("cypress");
 
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5053',
    specPattern: "cypress/e2e/**/*.cy.js",
    video: true,
    defaultCommandTimeout: 8000,
    slowTestThreshold: 1000,
  },
});
