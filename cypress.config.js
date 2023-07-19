const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  requestTimeout: 30000, 
  chromeWebSecurity: false,
  modifyObstructiveCode: false,
  ensureScrollable: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://gift-cards.phorest.com/salons/demous#",
    testIsolation: false,
    retries:2,
  },
});
