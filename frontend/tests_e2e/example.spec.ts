import { test, expect } from '@playwright/test';

test('HeaderBar drawer and About navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1200, height: 800 }); // Ensure desktop view
  await page.goto('/');

  // Click the ListIcon (drawer button)
  await page.getByLabel('open drawer').click();

  // Open the burger menu. nth(0) to select the HeaderBar one
  await page.getByLabel('open dropdown menu').nth(0).click();

  // Check "About" is visible in the dropdown
  const aboutItem = page.getByRole('menuitem', { name: 'About' });
  await expect(aboutItem).toBeVisible();

  // Click "About"
  await aboutItem.click();

  // Check URL changed to /about
  await expect(page).toHaveURL(/\/about$/);
});
