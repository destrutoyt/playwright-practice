// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  workers: 1, // Run tests in a single worker. Using more workers can lead to failed tests due to "timeout" issues. Adjust based on your system's capabilities. More workers > Faster Execution, but less stability.
  testDir: './tests',
  timeout: 80 * 1000, // 80 seconds
  expect: {
    timeout: 80 * 1000, // 80 seconds
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true, // Set to false if you want to see the browser in action
    screenshot: 'only-on-failure', // Take a screenshot only on test failure
    trace: 'retain-on-failure' // Retain trace files only on test failure
  },
});

