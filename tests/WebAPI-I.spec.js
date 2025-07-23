import {test, expect, request} from '@playwright/test';
const {APIUtils} = require('../utils/APIUtils'); // Import the APIUtils class

const loginPayLoad = {"userEmail":"TestLike@gmail.com","userPassword":"Thisatest123"};
const orderPayload = {"orders":[{"country":"India","productOrderedId":"67a8df56c0d3e6622a297ccd"}]};

let token;
let orderId;
let response; // Declare response variable to store the order ID

test.beforeAll( async () => {
    console.log("beforeAll - This will run once before all tests");
    const apiContext = await request.newContext(); // Create a new request context if needed
    const apiUtils = new APIUtils(apiContext, loginPayLoad); // Create an instance of APIUtils with the apiContext
    response = await apiUtils.createOrder(orderPayload); // Create an order and get the order ID
});

test.beforeEach( () => {
    console.log("beforeEach - This will run before each test");
});


test('@API Client/Buyer Testing', async ({browser}) => {

  const context = await browser.newContext();
  const page = await context.newPage();

  await page.addInitScript(value => {
    window.localStorage.setItem('token', value);
  }, response.token); // Set the token in localStorage before navigating to the page - "token" sets the "value" parameter.

  console.log("Token set in localStorage. Login should be successful.");

  await page.goto("https://rahulshettyacademy.com/client/"); // Navigate to the client page
  await page.locator("button[routerlink*='myorders']").click(); // Click on the "My Orders" button
  await page.locator('tbody').waitFor(); // Wait for the table body to be present

  const rows = await page.locator('tbody tr');

  for (let i = 0; await rows.count(); ++i) {
    const rowOrderId = await rows.nth(i).locator('th').textContent();
    if (response.orderId.includes(rowOrderId)) {
        await rows.nth(i).locator('button').first().click(); // Click the button in the row that matches the order ID
        break; // Exit the loop once the order is found and the button is clicked
    }
  }
  
  const orderIdDetails = await page.locator('.col-text').textContent();
 // await page.pause(); // Pause the test to inspect the page if needed
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy(); // Assert that the order ID details contain the expected order ID

  // Assert Order Confirmation
//   const orderConfirmation = page.locator('.hero-primary');
//   await expect(orderConfirmation).toHaveText('Thankyou for the order.');
});

// Verify if irder created is showing in history page
// Precondition - Create an order