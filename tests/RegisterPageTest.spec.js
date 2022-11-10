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
  const successMessage = dataSet.success;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const successCreatedNewAccount = await registerPage.successCreatedMessage;
  const successCreatedNewAccountText =
    await successCreatedNewAccount.textContent();
  console.log(" =====> " + successCreatedNewAccountText + " <===== ");
  expect(successCreatedNewAccount).toHaveText(successMessage);
});

test("Do Register Existing Customer Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const registerPage = basePage.getRegisterPage();
  await yourStorePage.launchURL();

  const firstName = dataSet.firstName;
  const lastName = dataSet.lastName;
  const email = dataSet.email;
  const phone = dataSet.phone;
  const psw = dataSet.psw;
  const alertEmailAlreadyRegisteredMessage = dataSet.alertExistingCustomer;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const alertEmailAlreadyRegistered = await registerPage.warning;
  const alertEmailAlreadyRegisteredText =
    await alertEmailAlreadyRegistered.textContent();
  console.log(" =====> " + alertEmailAlreadyRegisteredText + " <===== ");
  expect(alertEmailAlreadyRegistered).toHaveText(
    alertEmailAlreadyRegisteredMessage
  );
});

test("Do Register New Customer With Minimum Phone Number Value Test", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const registerPage = basePage.getRegisterPage();
  await yourStorePage.launchURL();

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number("##");
  const psw = faker.internet.password();
  const telephoneAlertMessage = dataSet.telephoneAlertMessage;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const telephoneAlert = await registerPage.alertMesssage;
  const telephoneAlertText = await telephoneAlert.textContent();
  console.log(" =====> " + telephoneAlertText + " <===== ");
  expect(telephoneAlert).toHaveText(telephoneAlertMessage);
});

test("Do Register New Customer With Maximum Phone Number Value Test", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const registerPage = basePage.getRegisterPage();
  await yourStorePage.launchURL();

  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phone = faker.phone.number("##################################");
  const psw = faker.internet.password();
  const telephoneAlertMessage = dataSet.telephoneAlertMessage;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const telephoneAlert = await registerPage.alertMesssage;
  const telephoneAlertText = await telephoneAlert.textContent();
  console.log(" =====> " + telephoneAlertText + " <===== ");
  expect(telephoneAlert).toHaveText(telephoneAlertMessage);
});

test("Do Register New Customer With Minimum Password Value Test", async ({
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
  const psw = faker.internet.password(3);
  const passwordAlertMessage = dataSet.passwordAlertMessage;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const passwordAlert = await registerPage.alertMesssage;
  const passwordAlertText = await passwordAlert.textContent();
  console.log(" =====> " + passwordAlertText + " <===== ");
  expect(passwordAlert).toHaveText(passwordAlertMessage);
});

test("Do Register New Customer With Maximum Password Value Test", async ({
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
  const psw = faker.internet.password(41);
  const passwordAlertMessage = dataSet.passwordAlertMessage;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegister(firstName, lastName, email, phone, psw);

  const passwordAlert = await registerPage.alertMesssage;
  const passwordAlertText = await passwordAlert.textContent();
  console.log(" =====> " + passwordAlertText + " <===== ");
  expect(passwordAlert).toHaveText(passwordAlertMessage);
});

test("Do Register New Customer With Dismatched Password Value Test", async ({
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
  const psw = faker.internet.password();
  const pswConfirm = faker.internet.password();
  const passwordDismatchedAlertMessage = dataSet.passwordDismatchAlert;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegisterDismatchPsw(
    firstName,
    lastName,
    email,
    phone,
    psw,
    pswConfirm
  );

  const passwordDismatchedAlert = await registerPage.alertMesssage;
  const passwordDismatchedAlertText =
    await passwordDismatchedAlert.textContent();
  console.log(" =====> " + passwordDismatchedAlertText + " <===== ");
  expect(passwordDismatchedAlert).toHaveText(passwordDismatchedAlertMessage);
});

test("Do Register New Customer With Minimum Password Value/Dismatched Test", async ({
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
  const pswConfirm = faker.internet.password(3);
  const passwordAlertMessage = dataSet.passwordAlertMessage;
  const passwordUnmatchedAlertMessage = dataSet.passwordDismatchAlert;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegisterDismatchPsw(
    firstName,
    lastName,
    email,
    phone,
    psw,
    pswConfirm
  );

  const passwordAlert = await registerPage.pswAlertMinMaxValue;
  const passwordAlertText = await passwordAlert.textContent();
  console.log(" =====> " + passwordAlertText + " <===== ");
  expect(passwordAlert).toHaveText(passwordAlertMessage);

  const passwordDismatchedAlert = await registerPage.pswAlertUnmatchedValue;
  const passwordDismatchedAlertText =
    await passwordDismatchedAlert.allTextContents();
  console.log(" =====> " + passwordDismatchedAlertText + " <===== ");
  expect(passwordDismatchedAlert).toHaveText(passwordUnmatchedAlertMessage);
});

test("Do Register New Customer Without Agreement Policy Test", async ({
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
  const psw = faker.internet.password();
  const pswConfirm = faker.internet.password();
  const agreementPolicyMessage = dataSet.agreementPolicy;

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  await registerPage.doRegisterWithoutAgreementPolicy(
    firstName,
    lastName,
    email,
    phone,
    psw,
    pswConfirm
  );

  const agreementPolicyWarning = await registerPage.warning;
  const agreementPolicyWarningText = await agreementPolicyWarning.textContent();
  console.log(" =====> " + agreementPolicyWarningText + " <===== ");
  expect(agreementPolicyWarning).toHaveText(agreementPolicyMessage);
});
