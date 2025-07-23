import { test, expect, request } from "@playwright/test";
const { APIUtils } = require("../utils/APIUtils"); // Import the APIUtils class

const loginPayLoad = {
  userEmail: "TestLike@gmail.com",
  userPassword: "Thisatest123",
};
const orderPayLoad  = {
  orders: [{ country: "India", productOrderedId: "67a8df56c0d3e6622a297ccd" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };

let token;
let orderId;
let response; // Declare response variable to store the order ID

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
 
})
 
 
//create order is success
test('@NET Place the order', async ({ page }) => {
  page.addInitScript(value => {
 
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");
 
 
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill(
        {
          response,
          body, 
 
        });
      //intercepting response -APi response-> { playwright fakeresponse}->browser->render data on front end
    });
 
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
});