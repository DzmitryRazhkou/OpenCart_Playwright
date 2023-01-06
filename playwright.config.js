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

  reporter: "html", //npx playwright show-report
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "on",
        trace: "on",
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chrome",
        headless: false,
        screenshot: "on",
        trace: "on",
      },
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        headless: false,
        screenshot: "on",
        trace: "on",
      },
    },
  ],
};

module.exports = config;
