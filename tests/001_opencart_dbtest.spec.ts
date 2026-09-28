/*

dependency:
    npm install mysql2 

Frontend:
http://localhost/opencart/upload/

Backend Admin:
http://localhost/opencart/upload/admin/index.php
admin/admin

DB Access URL: 
http://localhost/phpmyadmin/  



Test Flow:
---
OpenCart Frontend
          ↓
Customer Registration
          ↓
Verify Account Created
          ↓
OpenCart Admin Login (admin/admin)
          ↓
Navigate to Customers
          ↓
Search Customer by Email
          ↓
Validate Customer Details
          ↓
Query MySQL Database
          ↓
Validate Database Record
          ↓
Test Passed

*/

import { test, expect } from '@playwright/test';
import { executeQuery } from '../day37/dbClient';


test('Customer Registration and Database Validation', async ({ page,browser }) => {
   
    const timestamp = Date.now();

    const customer = {
        firstName: 'John',
        lastName: 'Tester',
        email: `john${timestamp}@gmail.com`,
        telephone: '9876543210',
        password: 'Password@123',
        status: 'Enabled'
    };
   
    // Step 1: FRONTEND REGISTRATION
    await page.goto('http://localhost/opencart/upload/');

    await page.getByRole('link', { name: 'My Account', exact: true }).click();
    await page.getByRole('link', { name: 'Register' }).click();

    await page.getByPlaceholder('First Name').fill(customer.firstName);
    await page.getByPlaceholder('Last Name').fill(customer.lastName);
    await page.getByPlaceholder('E-Mail').fill(customer.email);
    await page.getByPlaceholder('Telephone').fill(customer.telephone);

    await page.getByPlaceholder('Password', { exact: true }).fill(customer.password);
    await page.getByPlaceholder('Password Confirm', { exact: true }).fill(customer.password);

    await page.locator('input[name="agree"]').check();

    await page.getByRole('button', { name: 'Continue' }).click();

    await expect(page.locator('#content h1')).toContainText('Your Account Has Been Created');

    console.log('Customer Registered : ', customer);

    await page.close()

    // Step 2: BACKEND ADMIN LOGIN AND CUSTOMER SEARCH
    const adminPage = await browser.newPage();
    await adminPage.goto('http://localhost/opencart/upload/admin/index.php');
    await adminPage.getByPlaceholder('Username').fill('admin');
    await adminPage.getByPlaceholder('Password').fill('admin');
    await adminPage.getByRole('button', { name: 'Login' }).click();


     // Close dashboard popup if it appears
    try {
        await adminPage.locator('.btn-close').click({ timeout: 3000 });
    } catch { }

    // Close security popup if it appears
    try {
        const securityModal = adminPage.locator('#modal-security');
        if (await securityModal.count() > 0) {
            await securityModal.locator('button.close, .close, .btn-close, [data-dismiss="modal"]').first().click({ timeout: 3000 }).catch(() => { });
            await securityModal.waitFor({ state: 'hidden', timeout: 5000 }).catch(() => { });
        }
    } catch { }
    

    await adminPage.getByRole('link', { name: 'Customers' }).click();
    await adminPage.getByRole('link', { name: 'Customers' }).nth(1).click();

    const customerRow = adminPage.locator('table tbody tr', { hasText: customer.email });
    await expect(customerRow).toHaveCount(1);
    await expect(customerRow).toContainText(customer.firstName);
    await expect(customerRow).toContainText(customer.lastName);
    await expect(customerRow).toContainText(customer.email);
    await expect(customerRow).toContainText(customer.status);

    // Step 3: DATABASE VALIDATION
    const sql = 'SELECT firstname,lastname,email,status,date_added FROM oc_customer WHERE email = ?';
    const dbResult = await executeQuery(sql, [customer.email] as any[]);

    console.log('Database Result: ', dbResult);
    
    expect(dbResult.length).toBe(1);
    expect(dbResult[0].firstname).toBe(customer.firstName);
    expect(dbResult[0].lastname).toBe(customer.lastName);
    expect(dbResult[0].email).toBe(customer.email);
    expect(dbResult[0].status).toBe(1);
    expect(dbResult[0].date_added).not.toBeNull();

    console.log('Database Validation Successful for Customer: ', customer.email);


})