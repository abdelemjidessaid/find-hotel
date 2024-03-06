import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

/*{
  "_id":{
    "$oid":"65e72e90d85ea5482d545c75"
  },
  "email":"user@one.me",
  "password":"$2a$08$3vdvuxNPEggyjMPc/6ZCz.4rEoL8dT.x/n2ztTobWbXb6C.ialgmm",
  "firstName":"user",
  "lastName":"one",
  "__v":{
    "$numberInt":"0"
  }
}*/

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);
  // click on the sign in button
  await page.getByRole('link', { name: 'Sign In' }).click();
  // check if the heading is visible
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
  // find the email input and fill it
  await page.locator('[name=email]').fill('user@one.me');
  // find the password input and fill it
  await page.locator('[name=password]').fill('userone');
  // click on login button
  await page.getByRole('button', { name: 'Login' }).click();
  // if the login is success expected to find the toast
  await expect(page.getByText('Sign in successful')).toBeVisible();
  // and expected to find links of the main page after login
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});

test('should allow the user to register', async ({ page }) => {
  const testEmail = `test_${
    Math.floor(Math.random() * 90000) + 10000
  }@email.me`;
  await page.goto(UI_URL);

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Create an Account' }).click();
  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
  ).toBeVisible();

  await page.locator('[name=firstName]').fill('test_firstname');
  await page.locator('[name=lastName]').fill('test_lastname');
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill('test_password');
  await page.locator('[name=confirmPassword]').fill('test_password');

  await page.getByRole('button', { name: 'Create Account' }).click();

  // and expected to find links of the main page after login
  await expect(page.getByText('Registration done successfully.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Bookings' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
