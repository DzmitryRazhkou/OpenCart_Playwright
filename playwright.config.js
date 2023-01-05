const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  retries: 10,
  /* Workers --> VM for parallel execution */
  workers: 3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  reporter: "html",

  use: {
    browserName: "webkit",
    headless: true,
    screenshot: "on",
    trace: "on",
  },
};

module.exports = config;
