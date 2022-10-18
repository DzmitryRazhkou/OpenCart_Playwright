const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/contactUsPage.json"))
);
import { faker } from "@faker-js/faker";

test("Your Contact Us Page Title Test", async ({ page }) => {
  const titlePageContactUs = dataSet.titlePage;
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageContactUs);
});

test("Contact Us With Valid Data Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const yourName = faker.name.fullName();
  const email = faker.internet.email();
  const enquiry = faker.address.streetAddress();

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const successMessage = await contactUsPage.getSuccessMessage;
  const successMessageText = await successMessage.textContent();

  console.log(" =====> " + successMessageText + " <===== ");
  expect(successMessage).toHaveText(successMessageText);
});

test("Contact Us With Invalid Data Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const yourName = faker.name.fullName();
  const email = faker.internet.email().replace("@", "");
  const enquiry = faker.address.streetAddress();

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(
    "E-Mail Address does not appear to be valid!"
  );
});
