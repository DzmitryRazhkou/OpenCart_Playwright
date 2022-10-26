const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/shoppingPage.json"))
);
import { faker } from "@faker-js/faker";

test("Your Shopping Page Title Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const titlePageCheckOut = dataSet.titlePage;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);

  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  await searchPage.proceedToCheckOut();

  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageCheckOut);
});

test("Validate Existing Radio Button Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const existingAddress = dataSet.existingAddress;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const shoppingPage = basePage.getShoppingCartPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);

  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  await searchPage.proceedToCheckOut();
  await shoppingPage.selectAddress(existingAddress);
  const existRadioButton = await shoppingPage.getExistingAddressRadio;
  expect(existRadioButton).toHaveText(existingAddress);
});

test("Validate New Address Radio Button Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const newAddress = dataSet.newAddress;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const shoppingPage = basePage.getShoppingCartPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);

  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  await searchPage.proceedToCheckOut();
  await shoppingPage.selectAddress(newAddress);
  const newAddressRadioButton = await shoppingPage.getNewAddressRadio;
  expect(newAddressRadioButton).toHaveText(newAddress);
});

test("Do Check Out Product Existing Address Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const existingAddress = dataSet.existingAddress;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;
  const comment = faker.lorem.text();

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const shoppingPage = basePage.getShoppingCartPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);

  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  await searchPage.proceedToCheckOut();
  await shoppingPage.selectAddress(existingAddress);
  await shoppingPage.clickContinueButtton();
  await shoppingPage.paymentMethod(comment);

  const warningAlertFlag = await shoppingPage.warningAlert.textContent();
  console.log(" =====> " + warningAlertFlag + " <===== ");
  expect(await shoppingPage.warningAlert).toBeTruthy();
});

test.only("Do Check Out Product New Address Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const newAddress = dataSet.newAddress;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;
  const comment = faker.lorem.text();

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const shoppingPage = basePage.getShoppingCartPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);

  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  await searchPage.proceedToCheckOut();
  await shoppingPage.selectAddress(newAddress);
  await shoppingPage.selectCountry("Unites States");
  await page.pause();
});
