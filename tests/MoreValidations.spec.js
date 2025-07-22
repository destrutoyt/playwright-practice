import {test , expect} from '@playwright/test';

test('Popup Validation', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    // await page.goto("http://google.com");
    // await page.goBack();    // Navigate back to the previous page (From Google to AutomationPractice)
    // await page.goForward(); // Navigate forward to the next page (From AutomationPractice to Google)

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    page.on("dialog", dialog => {       // Listen for dialog events. Example: "ON" dialog, do this.
        dialog.accept(); // Or dialog.dismiss(); to dismiss the dialog
    })
    await page.locator("#confirmbtn").click(); // This will trigger a 
    
    await page.locator("#mousehover").hover(); // Hover over the element to trigger the tooltip


    // HANDLE IFRAMES
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
})

test('Screenshots & Visual Comparisons', async ({ page }) => {
    
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible() // Take a screenshot of the element
    await page.locator("#displayed-text").screenshot({path: 'partialScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({ path: 'screenshot.png' }); // Take a screenshot of the current page
    await expect(page.locator("#displayed-text")).toBeHidden();


})

// test("Visual Testing", async ({ page }) => { // This test is commented out to avoid running it automatically. Make sure the toMatchSnapshot() contains the correct path to the snapshot file.
//     await page.goto("https://www.rediff.com/");
//     expect(await page.screenshot()).toMatchSnapshot("landing.png"); // Take a screenshot and compare it with the snapshot
// })