/*
Step 1: capture the snapshot

Step 2, 3, 4:   run the test


toMatchSnapshot()
toHaveScreenshot()


*/


import { test, expect } from '@playwright/test';


test("Visual test", async({page})=>{

await page.goto("https://demowebshop.tricentis.com/");

//Method 1:

//Full page snapshop
//expect(await page.screenshot()).toMatchSnapshot("homepage.png")

//compare snapshot of the element
 //const logo=page.locator("img[alt='Tricentis Demo Web Shop']");
 //expect(await logo.screenshot()).toMatchSnapshot("logo.png");

 //Method 2:
await expect(page).toHaveScreenshot()

})