const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(JSON.stringify(require("../utils/loginPage.json")));

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

test("Login Invalid Credentials Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  await yourStorePage.launchURL();

  const email = dataSet.wrong_email;
  const psw = dataSet.wrong_password;
  const warning = dataSet.warningAlert;

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  await loginPage.doLogin(email, psw);

  const warningLink = await loginPage.warning;
  const warningLinkText = await warningLink.textContent();
  console.log(" =====> " + warningLinkText + " <===== ");
  expect(warningLink).toContainText(warning);
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
