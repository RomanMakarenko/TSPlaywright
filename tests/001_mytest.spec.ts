import { test, expect } from "@playwright/test";

/*
//fixture - global variable  : page, browser


test("Title",async({page})=>{

//step1
//step 2
//step 3..
})

*/


test("Verify title",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/")
    await expect(page).toHaveTitle("Demo Web Shop")
})


