const {test, expect} = require('@playwright/test'); // IMPORTANT TO ENABLE PLAYWRIGHT TESTS

// Playwright has a global timeout of 30 seconds which is overridden by the configuration file


test('Basics of Playwright - First Playwright Test', async ({browser}) => {        // Browser is a fixture that must have curly braces in order to work or it would be identified as a variable

    // Opens a new browser context (like a new incognito window)
    // await means that the test will wait for the browser to open before proceeding
    const context = await browser.newContext()
    const page = await context.newPage()   // Opens a new page in the browser context 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") // Navigates to the specified URL
    console.log(await page.title()) // Logs the title of the page to the console

    const userName = page.locator('#username'); // Locates the username input field by its CSS selector'
    const signIn = page.locator('#signInBtn'); // Locates the sign-in button by its CSS selector
    const cardTitles = page.locator('.card-body a'); // Locates all elements with the class 'card-body a'

    // css  type (deprecated), fill (recommended)
    await userName.fill('rahulshettyacadey') // Fills the input field with the specified value - Correct Username: 'rahulshettyacademy'
    await page.locator('[type="password"]').fill('learning') // Fills the password field with the specified value
    await signIn.click() // Clicks the sign-in button
    console.log(await page.locator("[style *='block']").textContent()) // Gets the text content of the element with the specified style
    await expect(page.locator("[style *='block']")).toContainText("Incorrect") // Asserts that the text content of the element contains the specified text

    // Clear existing content
    await userName.fill('') // Clears the input field
    await userName.fill('rahulshettyacademy') // Fills the input field with the correct username
    await signIn.click()

    // console.log(await cardTitles.first().textContent()) // Clicks the first element with the specified class and logs its text content
    // console.log(await cardTitles.nth(1).textContent()) // Clicks the second element with the specified class and logs its text content
    
    const allCardTitles = await cardTitles.allTextContents() // Gets all elements with the specified class
    console.log(allCardTitles) // Gets the text content of all elements with the specified 
    
});

test('UI Controls', async ({page}) => {        // .only() is used to run only this test, ignoring others

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") // Navigates to the specified URL

    const userName = page.locator('#username'); // Locates the username input field by its CSS selector'
    const signIn = page.locator('#signInBtn'); // Locates the sign-in button by its CSS selector

    const dropDown = page.locator("select.form-control"); // Locates the dropdown element by its CSS selector
    const radioButton = page.locator('.radiotextsty') // Locates the radio button by its CSS selector
    const checkBox = page.locator('#terms') // Locates the checkbox by its CSS selector

    const documentLink = page.locator('[href*="documents-request"]'); // Locates the link with 'documents-request' in its href attribute

    await dropDown.selectOption('consult') // Selects the option with the value 'consult' in the dropdown
    await radioButton.last().click() // Checks the radio button
    await page.locator('#okayBtn').click() // Clicks the button with the ID 'okayBtn'
    await checkBox.click() // Clicks the checkbox

    console.log(await radioButton.last().isChecked()); // Asserts that the last radio button is checked

    await expect(radioButton.last()).toBeChecked()
    await expect(checkBox).toBeChecked() // Asserts that the checkbox is checked

    // "await" before expect() uses Playwright's auto-waiting feature — you're waiting for the entire assertion to pass (✅ PREFERRED WAY)
    // "await" inside expect() only waits for the value to resolve — it does NOT auto-retry the assertion (⚠️ NOT RECOMMENDED for element checks)

    await checkBox.uncheck() // Unchecks the checkbox
    expect(await checkBox.isChecked()).toBeFalsy() // Asserts that the checkbox is not checked

    await expect(documentLink).toHaveAttribute('class', 'blinkingText') // Asserts that the link has the specified href attribute

    // await page.pause(); // Pauses the execution of the test, allowing you to inspect the page manually
});

test('Section 4 - Log in and find first card title/element', async ({browser}) => {        // .only() is used to run only this test, ignoring others

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator('[type="email"]'); // Locates the email input field by its CSS selector - Correct Email: 'TestLike@gmail.com'
    const password = page.locator('[type="password"]'); // Locates the password input field by its CSS selector - correct Password: 'Thisatest123'
    const signIn = page.locator('#login'); // Locates the sign-in button by its CSS selector

    await email.fill('TestLike@gmail.com')
    await password.fill('Thisatest123')
    await signIn.click()

    await page.waitForLoadState('networkidle'); // Waits for the network to be idle before proceeding

    const cardTitles = page.locator('.card-body h5') // Locates all elements with the class 'card-body'. 
    console.log(await cardTitles.first().textContent()) // Gets the text content of the first element with the specified class
    console.log(await cardTitles.nth(1).textContent()) // Gets the text content of the second element with the specified class
});

test('Child Windows Handling', async ({browser}) => {        // .only() is used to run only this test, ignoring others

    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username'); // Locates the username input field by its CSS selector

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/") // Navigates to the specified URL

    const documentLink = page.locator('[href*="documents-request"]'); // Locates the link with 'documents-request' in its href attribute

    const [newPage] =  await Promise.all([ // Waits for the new page to be opened. Promise.all is used to wait for multiple promises to resolve
        context.waitForEvent('page'), // Waits for a new page to be opened (the child window)
        documentLink.click() // Clicks the link to open the child window
    ])

    // newPage is the child window. So, on the test below, we are testing the child window.
    const text = await newPage.locator('.red').textContent() // Gets the text content of the element with the class 'red' in the child window'
    const arrayText = text.split("@") // Splits the text content by '@' to get the email address
    const domain = arrayText[1].split(" ")[0] // Gets the email address from the split text

    console.log(domain) // Logs the email address to the console
    await page.locator('#username').fill(domain) // Fills the username input field with the email address
    await page.locator("#username").textContent() // Gets the text content of the username input field
    console.log(text) // Logs the text content to the console
})