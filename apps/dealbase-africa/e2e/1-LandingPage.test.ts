import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("loads the landing page correctly", async ({ page }) => {
  await expect(
    page.locator("text=Track the Latest in African Tech Fundraising").first()
  ).toBeVisible();
});

test("Founders sign up", async ({ page }) => {
  await expect(
    page
      .locator("text=Track the Latest in African Tech Fundraising")
      .first()
      .first()
  ).toBeVisible();

  // Click button:has-text("Investors")
  await page.locator('button:has-text("Founders")').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill("example@email.com");

  // Press Tab
  await page.locator('[placeholder="Email"]').press("Tab");

  // Fill [placeholder="First Name"]
  await page.locator('[placeholder="First Name"]').fill("John");

  // Press Tab
  await page.locator('[placeholder="First Name"]').press("Tab");

  // Fill [placeholder="Last Name"]
  await page.locator('[placeholder="Last Name"]').fill("Doe");

  // Press Tab
  await page.locator('[placeholder="Last Name"]').press("Tab");

  // Fill [placeholder="Company"]
  await page.locator('[placeholder="Company"]').fill("My Company");

  // Click text=Cancel
  await page.locator("text=Cancel").click();
});

test("Investor sign up", async ({ page }) => {
  await expect(
    page
      .locator("text=Track the Latest in African Tech Fundraising")
      .first()
      .first()
  ).toBeVisible();

  // Click button:has-text("Investors")
  await page.locator('button:has-text("Investors")').click();

  // Fill [placeholder="Email"]
  await page.locator('[placeholder="Email"]').fill("example@email.com");

  // Press Tab
  await page.locator('[placeholder="Email"]').press("Tab");

  // Fill [placeholder="First Name"]
  await page.locator('[placeholder="First Name"]').fill("John");

  // Press Tab
  await page.locator('[placeholder="First Name"]').press("Tab");

  // Fill [placeholder="Last Name"]
  await page.locator('[placeholder="Last Name"]').fill("Doe");

  // Press Tab
  await page.locator('[placeholder="Last Name"]').press("Tab");

  // Fill [placeholder="Company"]
  await page.locator('[placeholder="Company"]').fill("My Company");

  // Click text=Cancel
  await page.locator("text=Cancel").click();
});

// it("can add an investor to the subscribers", () => {
//   cy.intercept("POST", "**/api/subscribers", {
//     statusCode: 200,
//     body: {
//       success: true,
//       subscriber: {},
//     },
//   }).as("subscribers");

//   cy.findByRole("button", { name: /investors/i }).click();
//   cy.findByPlaceholderText(/Email/i).type("test@email.com");
//   cy.findByPlaceholderText(/First Name/i).type("John");
//   cy.findByPlaceholderText(/Last Name/i).type("Doe");
//   cy.get("input[name='company']").type("Acme");
//   cy.findByRole("button", { name: /Sign up/i }).click();

//   cy.wait("@subscribers");

//   cy.findByText(/Successfully Signed Up/i);
//   cy.findByText(/Your details have been added to our subscriber list/i);
//   cy.findByRole("button", { name: /Close/i }).click();
//   cy.findByText(/Successfully Signed Up/i).should("not.exist");
// });
