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

test("Contact Us Invalid Your Name Minimum Value Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const lengthOfString = dataSet.lengthOfStringYourNameMinimum;
  const yourName = contactUsPage.createString(lengthOfString);
  const email = faker.internet.email();
  const enquiry = faker.address.streetAddress();

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(alertMessageText);
});

test("Contact Us Invalid Your Name Maximum Value Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const lengthOfString = dataSet.lengthOfStringYourNameMaximum;
  const yourName = contactUsPage.createString(lengthOfString);
  const email = faker.internet.email();
  const enquiry = faker.address.streetAddress();

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(alertMessageText);
});

test("Contact Us With Invalid Email Address Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const yourName = faker.name.fullName();
  const email = faker.internet.email().replace("@", "");
  const enquiry = faker.address.streetAddress();
  const alert = dataSet.alertMessage;

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(alert);
});

test("Contact Us Invalid Enquiry Minimum Value Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const lengthOfString = dataSet.lengthOfStringEnquiryMinimum;
  const yourName = faker.name.fullName();
  const email = faker.internet.email();
  const enquiry = contactUsPage.createString(lengthOfString);

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(alertMessageText);
});

test("Contact Us Invalid Enquiry Maximum Value Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const contactUsPage = basePage.getContactUsPage();

  const lengthOfString = dataSet.lengthOfStringEnquiryMaximum;
  const yourName = faker.name.fullName();
  const email = faker.internet.email();
  const enquiry = contactUsPage.createString(lengthOfString);

  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  await contactUsPage.doContactUs(yourName, email, enquiry);

  const alertMessage = await contactUsPage.dangerAlert;
  const alertMessageText = await alertMessage.textContent();

  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(alertMessageText);
});
