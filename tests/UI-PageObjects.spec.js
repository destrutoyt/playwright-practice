const { test, expect } = require("@playwright/test");
const { POManager } = require("../page-objects/POManager");

test("Client Login using Page Objects", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "TestLike@gmail.com";
  const password = "Thisatest123";

  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  const cartPage = poManager.getCartPage();
  const ordersReviewPage = poManager.getOrdersReviewPage();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();

  await loginPage.goToLoginPage();
  await loginPage.validLogin(email, password);

  await dashboardPage.searchProduct("ZARA COAT 3");
  await dashboardPage.navigateToCart();

  await cartPage.verifyProductInCart("ZARA COAT 3");
  await cartPage.proceedToCheckout();

  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);

  await dashboardPage.navigateToOrders();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
