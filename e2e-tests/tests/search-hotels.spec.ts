import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

/**
 * Login before every test
 */
test.beforeEach(async ({ page }) => {
  // login first
  await page.goto(UI_URL);
  await page.getByRole('link', { name: 'Sign In' }).click();
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  await page.locator('[name=email]').fill('user@one.me');
  await page.locator('[name=password]').fill('userone');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Sign in successful')).toBeVisible();
});

test('Should show hotel search results', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going ?').fill('Test Hotel');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByText('Hotels found in Test Hotel')).toBeVisible();
  await expect(page.getByText('Test Hotel')).toBeVisible();
});

test('Should show the hotel detail', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder('Where are you going ?').fill('Test Hotel');
  await page.getByRole('button', { name: 'Search' }).click();

  await page.getByText('View More').first().click();
  await expect(page).toHaveURL(/detail/, { timeout: 50000 });
  await expect(page.getByRole('button', { name: 'Book Now' })).toBeVisible();
});
