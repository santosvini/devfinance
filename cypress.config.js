const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "enczrf",
  e2e: {
    desktop: {
      viewportWidth: 1280,
      viewportHeight: 720, 
    },
    video: true,
    watchForFileChanges: false,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  experimentalWebKitSupport: true,
});
