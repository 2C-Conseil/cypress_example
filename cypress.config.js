const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // config natives de cypress
  e2e: {
    baseUrl: 'http://preprod.2cconseil-at2c.fr',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-log-to-output').install(on)

      on('after:screenshot', (details) => {
        console.log('>>>>', details);
      });
    },
  },
  // config personnalisées
  env: {
  }
});
