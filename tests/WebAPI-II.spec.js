import {test, expect} from '@playwright/test';

let webContext;

test.beforeAll(async ({browser}) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client');

  const email = page.locator("[type='email']");
  const password = page.locator("[type='password']");
  const loginButton = page.locator("[type='submit']");

  await email.fill('TestLike@gmail.com');
  await password.fill('Thisatest123');
  await loginButton.click();
  await page.waitForLoadState('networkidle');

  await context.storageState({ path: 'state.json'});    // Saves the state at the browser level. For example, cookies, local storage, etc.
  webContext = await browser.newContext({ storageState: 'state.json' }); // Loads the state for the next test run
})



test('Client/Buyer Testing', async () => {

  const page = await webContext.newPage();
  await page.goto('https://rahulshettyacademy.com/client');

  // Local Variables
  const products = page.locator('.card-body');

  // Find a product dynamically
  await page.locator('.card-body b').first().waitFor();
  const productName = 'IPHONE 13 PRO';
  const titles = await page.locator(".card-body b").allTextContents();
  const count = await products.count();

  console.log("Titles: ", titles);
  console.log("Count: ", count);

  for (let i = 0; i < count; i++) {
    const foundProducts = await products.nth(i).textContent();

    if (await products.nth(i).locator('b').textContent() === productName) {

      await products.nth(i).locator('text= Add To Cart').click();
      break; // Exit loop after finding the product
    }
  }
  console.log("End of loop")


  // Navigate to Cart
  await page.locator("[routerlink*='cart']").click();

  // Assert product in cart
  const cartProducts = page.locator('.cartSection h3');
  await expect(cartProducts).toContainText(productName);

  // Proceed to Checkout
  await page.locator('text=Checkout').click();

  // Select and Assert Country
    await page.getByPlaceholder('Select Country').pressSequentially('ind')
    await page.getByRole('button', { name: 'India' }).nth(1).click()

  // Checkout
    await page.getByText('PLACE ORDER').click()

  await page.pause()
  // Assert Order Confirmation
  const orderConfirmation = page.locator('.hero-primary');
  await expect(orderConfirmation).toHaveText('Thankyou for the order.');
});