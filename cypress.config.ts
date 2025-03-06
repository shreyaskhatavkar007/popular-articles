import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/integration/**/*.ts", // Update this pattern to look in the correct folder
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
