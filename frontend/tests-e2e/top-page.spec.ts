import { test, expect } from '@playwright/test';

test('has title logo image', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByAltText('World Logo')).toBeVisible();
});

test('view welcome header', async ({ page }) => {
  await page.goto('/');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
});
