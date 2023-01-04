const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(JSON.stringify(require("../utils/loginPage.json")));
import { faker } from "@faker-js/faker";

// test.describe.configure({ mode: "parallel" });
test("Your Login Page Title Test", async ({ page }) => {
  const titlePageYourStore = dataSet.titlePage;
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();

  await yourStorePage.launchURL();
  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageYourStore);
});

test("Login Valid Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const myAccountPage = basePage.getMyAccountPage();
  await yourStorePage.launchURL();

  const email = dataSet.email;
  const psw = dataSet.password;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const myAccountLink = await myAccountPage.myAccountLink;
  const myAccountLinkText = await myAccountLink.textContent();
  console.log(" =====> " + myAccountLinkText + " <===== ");
  expect(myAccountLink).toHaveText("Account");
});

test("Login Not Existing Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = faker.internet.email();
  const psw = faker.internet.password();
  const warningNoWatchEmailAddressPswMessage =
    dataSet.warningNoWatchEmailAddressPsw;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const warningNoWatchEmailAddressPsw = await loginPage.warning;
  const warningNoWatchEmailAddressPswText =
    await warningNoWatchEmailAddressPsw.textContent();
  console.log(" =====> " + warningNoWatchEmailAddressPswText + " <===== ");
  expect(warningNoWatchEmailAddressPsw).toHaveText(
    warningNoWatchEmailAddressPswMessage
  );
});

test("Login Wrong Email Valid Password Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = faker.internet.email().replace("@", "");
  const psw = dataSet.password;
  const warningNoWatchEmailAddressPswMessage =
    dataSet.warningNoWatchEmailAddressPsw;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const warningNoWatchEmailAddressPsw = await loginPage.warning;
  const warningNoWatchEmailAddressPswText =
    await warningNoWatchEmailAddressPsw.textContent();
  console.log(" =====> " + warningNoWatchEmailAddressPswText + " <===== ");
  expect(warningNoWatchEmailAddressPsw).toHaveText(
    warningNoWatchEmailAddressPswMessage
  );
});

test("Login Valid Email Wrong Password Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = dataSet.email;
  const psw = String(faker.internet.password);
  const warningNoWatchEmailAddressPswMessage =
    dataSet.warningNoWatchEmailAddressPsw;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const warningNoWatchEmailAddressPsw = await loginPage.warning;
  const warningNoWatchEmailAddressPswText =
    await warningNoWatchEmailAddressPsw.textContent();
  console.log(" =====> " + warningNoWatchEmailAddressPswText + " <===== ");
  expect(warningNoWatchEmailAddressPsw).toHaveText(
    warningNoWatchEmailAddressPswMessage
  );
});

test("Login Between One To Four Valid Password Credentials", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const numberBetweenOneToFour = String(
    faker.datatype.number({ min: 1, max: 4 })
  );
  const psw = dataSet.password;
  const warningExceedAllowedNumberLoginAttemptsMessage =
    dataSet.warningExceedAllowedNumberLoginAttempts;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(numberBetweenOneToFour, psw);

  const warningExceedAllowedNumberLoginAttempts = await loginPage.warning;
  const warningExceedAllowedNumberLoginAttemptsText =
    await warningExceedAllowedNumberLoginAttempts.textContent();
  console.log(
    " =====> " + warningExceedAllowedNumberLoginAttemptsText + " <===== "
  );
  expect(warningExceedAllowedNumberLoginAttempts).toHaveText(
    warningExceedAllowedNumberLoginAttemptsMessage
  );
});

test("Login Valid Email Just Numbers Password Credentials Test", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = dataSet.email;
  const justPswNumbers = String(
    faker.datatype.number({ min: 1, max: 10000000000 })
  );
  const warningNoWatchEmailAddressPswMessage =
    dataSet.warningNoWatchEmailAddressPsw;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, justPswNumbers);

  const warningNoWatchEmailAddressPsw = await loginPage.warning;
  const warningNoWatchEmailAddressPswText =
    await warningNoWatchEmailAddressPsw.textContent();
  console.log(" =====> " + warningNoWatchEmailAddressPswText + " <===== ");
  expect(warningNoWatchEmailAddressPsw).toHaveText(
    warningNoWatchEmailAddressPswMessage
  );
});

test("Login Between One To Four Email Just Numbers Password Credentials Test", async ({
  page,
}) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const numberBetweenOneToFour = String(
    faker.datatype.number({ min: 1, max: 4 })
  );
  const justPswNumbers = String(
    faker.datatype.number({ min: 1, max: 10000000 })
  );
  const warningExceedAllowedNumberLoginAttemptsMessage =
    dataSet.warningExceedAllowedNumberLoginAttempts;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(numberBetweenOneToFour, justPswNumbers);

  const warningExceedAllowedNumberLoginAttempts = await loginPage.warning;
  const warningExceedAllowedNumberLoginAttemptsText =
    await warningExceedAllowedNumberLoginAttempts.textContent();
  console.log(
    " =====> " + warningExceedAllowedNumberLoginAttemptsText + " <===== "
  );
  expect(warningExceedAllowedNumberLoginAttempts).toHaveText(
    warningExceedAllowedNumberLoginAttemptsMessage
  );
});

test("Login Invalid Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = dataSet.wrong_email;
  const psw = dataSet.wrong_password;
  const warningExceedAllowedNumberLoginAttemptsMessage =
    dataSet.warningExceedAllowedNumberLoginAttempts;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const warningExceedAllowedNumberLoginAttempts = await loginPage.warning;
  const warningExceedAllowedNumberLoginAttemptsText =
    await warningExceedAllowedNumberLoginAttempts.textContent();
  console.log(
    " =====> " + warningExceedAllowedNumberLoginAttemptsText + " <===== "
  );
  expect(warningExceedAllowedNumberLoginAttempts).toContainText(
    warningExceedAllowedNumberLoginAttemptsMessage
  );
});

test("Login Out Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = dataSet.email;
  const psw = dataSet.password;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);
  await loginPage.logOut();

  const logOutFlag = await loginPage.validateLogOutLink();
  expect(logOutFlag).toBeTruthy();
});
