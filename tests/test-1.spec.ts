import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://funtime.com.ua/');
  await page.getByRole('link').nth(2).click();
  await page.getByRole('link').nth(3).click();
  await page.getByRole('link', { name: 'Скала-Подільський  Замок' }).click();
});