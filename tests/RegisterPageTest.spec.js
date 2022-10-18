const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/registerPage.json"))
);
import { faker } from "@faker-js/faker";

test("Your Register Page Title Test", async ({ page }) => {
  const titlePageYourStore = dataSet.titlePage;
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();

  await yourStorePage.launchURL();
  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();

  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageYourStore);
});

test("Do Register New Customer Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const registerPage = basePage.getRegisterPage();
  await yourStorePage.launchURL();

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number();
  const psw = faker.internet.password();

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const successCreatedNewAccount = await registerPage.successCreatedMessage;
  const successCreatedNewAccountText =
    await successCreatedNewAccount.textContent();
  console.log(" =====> " + successCreatedNewAccountText + " <===== ");
  expect(successCreatedNewAccount).toHaveText("Your Account Has Been Created!");
});

test("Do Register New Customer With Invalid Credentials Test", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const registerPage = basePage.getRegisterPage();
  await yourStorePage.launchURL();

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number();
  const psw = faker.internet.password(2);

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, psw, phone);

  const alertMessage = await registerPage.alertMesssage;
  const alertMessageText = await alertMessage.textContent();
  console.log(" =====> " + alertMessageText + " <===== ");
  expect(alertMessage).toHaveText(
    "Password must be between 4 and 20 characters!"
  );
});
