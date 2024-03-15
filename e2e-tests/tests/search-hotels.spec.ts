import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

/**
 * Login before every test
 */
test.beforeEach(async ({ page }) => {
  // login first
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("user@one.me");
  await page.locator("[name=password]").fill("userone");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in successful")).toBeVisible();
});

test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going ?").fill("Test Hotel");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Test Hotel")).toBeVisible();
  await expect(page.getByText("Test Hotel")).toBeVisible();
});

test("Should show the hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going ?").fill("Test Hotel");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("View More").first().click();
  await expect(page).toHaveURL(/detail/, { timeout: 50000 });
  await expect(page.getByRole("button", { name: "Book Now" })).toBeVisible();
});

test("Should book a hotel for 3 days", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going ?").fill("Test Hotel");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];

  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("View More").first().click();

  await page.locator('[name="childCount"]').fill("3");
  await page.locator('[name="adultCount"]').fill("2");
  await page.getByRole("button", { name: "Book Now" }).click();

  await expect(page.getByText("Total Cost: $300.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("4242424242424242");
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("1025");
  await stripeFrame.locator('[placeholder="CVC"]').fill("123");
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12345");

  await page.getByRole("button", { name: "Confirm Booking" }).click();

  await expect(page.getByText("Booking Saved 👏")).toBeVisible();

  // Check if the room booked and found in My Bookings page
  await page.getByRole("link", { name: "My Bookings" }).click();
  await expect(page.getByText("Test Hotel")).toBeVisible({ timeout: 30000 });
});
