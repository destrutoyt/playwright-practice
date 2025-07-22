const { test, expect } = require("@playwright/test");
const { POManager } = require("../page-objects/POManager");
const testData = JSON.parse(JSON.stringify(require(("../utils/placeOrderTestData.json"))));  // JSON -> STRING -> JS OBJECT

for (const data of testData) {   // Loop through each data set in the test data
   test(`Client Login using Page Objects ${data.productName}`, async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = data.username;
   const password = data.password;

   const poManager = new POManager(page);
   const loginPage = poManager.getLoginPage();
   const dashboardPage = poManager.getDashboardPage();
   const cartPage = poManager.getCartPage();
   const ordersReviewPage = poManager.getOrdersReviewPage();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();

   await loginPage.goToLoginPage();
   await loginPage.validLogin(email, password);

   await dashboardPage.searchProduct(data.productName);
   await dashboardPage.navigateToCart();

   await cartPage.verifyProductInCart(data.productName);
   await cartPage.proceedToCheckout();

   await ordersReviewPage.searchCountryAndSelect("ind", "India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);

   await dashboardPage.navigateToOrders();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

   });
}
