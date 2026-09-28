/*
1) Playwright can be used to test your application for many types of accessibility issues.
Examples:
    Missing or Improper ALT Text for Images
    Poor Color Contrast
    Missing Form Labels
    Keyboard Navigation Issues

Every website should follow WCAG guidelines.
    - Web Content Accessibility Guidelines (WCAG) 

Install @axe-core/playwright: 
    npm install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright

WCAG reference: https://www.w3.org/WAI/standards-guidelines/wcag/

Practice demo: https://www.w3.org

*/

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


test.describe("Accessibility tests",()=>{

    test.beforeEach(async ({ page }) => {
        await page.goto('https://sdetqa.vercel.app/accessibility_test_app');
    });

    // 1. Basic Accessibility Scan

    test('Basic Accessibility Scan', async ({ page }) => {
        const results = await new AxeBuilder({ page }).analyze(); //Returns all accessibility violations.
        console.log(results.violations)
        //expect(results.violations).toEqual([]);  //Fails the test if any violations are found.

    });


       // 2. Print Accessibility Violations

     test('Print Accessibility Violations', async ({ page }) => {

        const results = await new AxeBuilder({ page }).analyze();
        console.log("Total Violations:",results.violations.length);

        //expect(results.violations.length).toEqual(0);

        //console.log(results.violations);

        for (const violation of results.violations) {
            console.log(`\nRule: ${violation.id}`);
            console.log(`Impact: ${violation.impact}`);
            console.log(`Description: ${violation.description}`);
        }

    });

// 3. Scan a Specific Section

 test('Scan Login Section Only', async ({ page }) => {
        const results = await new AxeBuilder({ page })
             .include('#section-login')
               .analyze();
        console.log(results.violations);

    });

// 4. Exclude a Section

    test('Exclude Advertisement and Footer', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .exclude('.ad-banner')
            .exclude('footer')
            .analyze();
        console.log(results.violations);

    });

// 5. Scan Specific WCAG Violations
    test('Scan WCAG 2.0 A and AA Rules', async ({ page }) => {

        const results = await new AxeBuilder({ page })
            .withTags([
                 'wcag2a',
                 'wcag412',
                 'wcag244'
                                 
            ]).analyze();

        console.log(results.violations);

    });


    // 6. Disable Individual Rules
    test('Disable color-contrast and image-alt Rules', async ({ page }) => {

        const results = await new AxeBuilder({ page })
            .disableRules([
                'color-contrast',
                'image-alt'
            ])
            .analyze();

        console.log(results.violations);

    });

    // 7. Export Scan Results as Test Attachment

test('Export Accessibility Report', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page }).analyze();

        await testInfo.attach("AccessibilityReport.json",{
            body: JSON.stringify(results),
            contentType: 'application/json'
        })
      console.log('Accessibility report attached successfully.');
    });

})