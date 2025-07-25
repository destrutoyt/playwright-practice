# Playwright UI & API Testing 🎭

This repository contains a practical collection of UI and API automated tests using Playwright, targeting an eCommerce demo app. It serves as a comprehensive playground for mastering Playwright’s capabilities, from interacting with page elements to intercepting network requests and handling authentication flows.

## 🏆 Highlights
- Covers dynamic product selection, login flow, cart management, and purchase validation.
- Demonstrates powerful API testing and request interception using Playwright's route and request methods.
- Utilizes Page Object Model (POM) for modular and reusable test structure.
- Includes token-based authentication for secure API calls.
- Easily extendable to new scenarios (like wishlist, profile update, or order history).
- Creates clean test reports using Allure.
- Integrated with **Jenkins** for automated CI/CD: runs tests on each push, with pipeline stages for build, test, and report generation.


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

### 📄 Get Reports (Allure)
Generate a report:
```
npx allure generate ./allure-report
```
Open report:
```
npx allure open ./allure-report
```

## 🚀 CI/CD with Jenkins

This project uses Jenkins for automated building, testing, and (optional) deployment. The `Jenkinsfile` defines a pipeline that runs on each push.

- Build: Compiles and lints the project
- Test: Runs unit/integration tests
- Deploy: (Optional) Deploys to [specify target, if public]

👉 Try it yourself: Clone the repo and hook it to Jenkins using GitHub integration.


## ⚠️ WARNING
In the `playwright.config.js` file, I set the workers to 2 to improve stability and reduce failed tests due to timeout issues. Increasing it will execute tests faster, but at the cost of less stability which leads to failed tests. Adjust it according to your system capabilities. Additionally, you may increase the `retries: 1` to execute the test again if it fails, but it will throw a "flaky" or "warning" message.