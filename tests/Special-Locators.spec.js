const {test, expect} = require('@playwright/test'); // IMPORTANT TO ENABLE PLAYWRIGHT TESTS

// Playwright has a global timeout of 30 seconds which is overridden by the configuration file

test('@WEB GetBy Locators', async ({page}) => {        // Browser is a fixture that must have curly braces in order to work or it would be identified as a variable

    await page.goto("https://rahulshettyacademy.com/angularpractice/") // Navigates to the specified 
    await page.getByLabel("Check me out if you love IceCreams!").click() // Locates the checkbox by its label
    await page.getByLabel("Employed").check() // Locates the radio button by its label and checks it
    await page.getByLabel("Gender").selectOption('Male'); // Locates the dropdown by its label and selects the option 'Male'

    // getByLabel works perfectly with the following scenarios
    // <label for="exampleInputEmail1">Email address</label> 
    // <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
    // OR
    // <label Password <input type="password" /> </label>

    // As you can see in the first scenario, the label is associated with the input field by the 'for' attribute, which matches the 'id' of the input field.
    // If it isn't associated, you can use the 'getByText' method to find the label and then use 'getByRole' to find the input field.

    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();          // PW will filter all buttons and find the one with the name 'Submit'
    await page.getByText("Success! The Form has been submitted successfully!").isVisible(); // Asserts that the success message is visible

    await page.getByRole("link", {name: "Shop"}).click(); // Locates the link with the name 'Shop' and clicks it
    await page.locator("app-card").filter({ hasText: "iphone X"}).getByRole("button").click(); // Finds all app-card elements, filters them by the text 'iphone X', and clicks the button within that element ('ADD')

    // Locators(css)

});