const base  = require("@playwright/test");

exports.customTest = base.test.extend({
  // You can add custom fixtures here if needed
  // For example, if you need a custom page setup or teardown
  // page: async ({ page }, use) => {
  //     await use(page);
  // }

  testDataForOrder: {
    username: "TestLike@gmail.com",
    password: "Thisatest123",
    productName: "ZARA COAT 3",
  },
});
