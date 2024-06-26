import { test, expect } from '@playwright/test';
import path from 'path';

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

/**
 * Test adding new Hotel
 */
test('Should allow the user to add new hotel', async ({ page }) => {
  // visit the add-hote page
  await page.goto(`${UI_URL}add-hotel`);
  // fill in the hotel info
  await page.locator('[name="name"]').fill('Test Hotel');
  await page.locator('[name="city"]').fill('Test City');
  await page.locator('[name="country"]').fill('Test Country');
  await page
    .locator('[name="description"]')
    .fill('Test Description about the new hotel...');
  await page.locator('[name="pricePerNight"]').fill('100');
  await page.locator('[name="name"]').fill('Test Hotel');

  await page.selectOption('select[name="starRating"]', '3');

  await page.getByText('Luxury').click();
  await page.getByLabel('Parking').check();
  await page.getByLabel('Free Wi-Fi').check();

  await page.locator('[name="adultCount"]').fill('2');
  await page.locator('[name="childCount"]').fill('3');

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'images', '1.jpg'),
    path.join(__dirname, 'images', '2.jpg'),
  ]);

  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Hotel saved successfully.')).toBeVisible({
    timeout: 50000,
  });
});

/**
 * Test the display of Hotels
 */
test('Should display the hotels', async ({ page }) => {
  // visit my hotels page
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText('Test Hotel').first()).toBeVisible({
    timeout: 15000,
  });
  await expect(
    page.getByText('Test Description about the new hotel...').first()
  ).toBeVisible();
  await expect(page.getByText('Test City, Test Country').first()).toBeVisible();
  await expect(page.getByText('Luxury').first()).toBeVisible();
  await expect(page.getByText('$100 per night').first()).toBeVisible();
  await expect(page.getByText('2 adults, 3 children').first()).toBeVisible();
  await expect(page.getByText('3 Star rating').first()).toBeVisible();

  await expect(
    page.getByRole('link', { name: 'View Details' }).first()
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});

/**
 * Test updating a hotel
 */
test('should edit hotel', async ({ page }) => {
  // visit the hotels page
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole('link', { name: 'View Details' }).first().click();

  await page.waitForSelector('[name="name"]', { state: 'attached' });
  await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel');
  await page.locator('[name="name"]').fill('Test Hotel Updated');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(
    page.getByText('Your hotel updated successfully.')
  ).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel Updated');
  await page.locator('[name="name"]').fill('Test Hotel');
  await page.getByRole('button', { name: 'Save' }).click();
});
