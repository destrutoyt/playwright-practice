# Playwright UI & API Testing 🎭

This repository contains a practical collection of UI and API automated tests using Playwright, targeting an eCommerce demo app. It serves as a comprehensive playground for mastering Playwright’s capabilities, from interacting with page elements to intercepting network requests and handling authentication flows.

## 🏆 Highlights
- Covers dynamic product selection, login flow, cart management, and purchase validation
- Demonstrates powerful API testing and request interception using Playwright's route and request methods
- Utilizes Page Object Model (POM) for modular and reusable test structure
- Includes token-based authentication for secure API calls
- Easily extendable to new scenarios (like wishlist, profile update, or order history

## 🧰 Tech Stack

- [Playwright](https://playwright.dev) — Modern end-to-end test framework for web automation
- JavaScript (ES6+) — clean syntax and async/await handling
- Node.js — for test execution


## 🚀 Getting Started

### Installation

```bash
git clone https://github.com/destrutoyt/playwright-practice.git
cd playwright-practice
npm install
npx playwright install
```

### 🧪 Running Tests

Run all tests with:
```
npx playwright test
```
To run a specific test file:
```
npx playwright test tests/<filename>.spec.js
```