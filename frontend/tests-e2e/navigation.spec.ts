import { test, expect } from '@playwright/test';

test('HeaderBar drawer and author navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 }); // Ensure desktop view
  await page.goto('/');

  // Open the burger menu. nth(0) to select the HeaderBar one
  await page.getByLabel('open dropdown menu').nth(0).click();

  // Check "Author" is visible in the dropdown
  const authorItem = page.getByRole('menuitem', { name: 'Author' });
  await expect(authorItem).toBeVisible();

  // Click "Author"
  await authorItem.click();

  // Check URL changed to /author
  await expect(page).toHaveURL(/\/author$/);
});

test('HeaderBar drawer and inquiry navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 }); // Ensure desktop view
  await page.goto('/');

  // Open the burger menu. nth(0) to select the HeaderBar one
  await page.getByLabel('open dropdown menu').nth(0).click();

  // Check "Inquiry" is visible in the dropdown
  const inquiryItem = page.getByRole('menuitem', { name: 'Inquiry' });
  await expect(inquiryItem).toBeVisible();

  // Click "Inquiry"
  await inquiryItem.click();

  // Check URL changed to /inquiry
  await expect(page).toHaveURL(/\/inquiry$/);
});
