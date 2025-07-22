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
  testDir: './tests',
  timeout: 40 * 1000, // 40 seconds
  expect: {
    timeout: 40 * 1000, // 40 seconds
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true, // Set to false if you want to see the browser in action
    screenshot: 'only-on-failure', // Take a screenshot only on test failure
    trace: 'retain-on-failure' // Retain trace files only on test failure
  },
});

