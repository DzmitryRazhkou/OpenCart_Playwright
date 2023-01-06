const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(JSON.stringify(require("../utils/searchPage.json")));

test("Your Search Page Title Test", async ({ page }) => {
  const titlePageSearch = dataSet.titlePage;
  const productName = dataSet.productName;
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();
  await yourStorePage.doSearch(productName);

  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageSearch);
});

test("@Web Do Add To Cart Product Test", async ({ page }) => {
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const searchPage = basePage.getSearchPage();
  await yourStorePage.launchURL();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);
  await yourStorePage.doSearch(productName);
  await searchPage.addToCartProduct(productName);
  const successMessageFlag = await searchPage.validateSuccessMessage();
  expect(successMessageFlag).toBeTruthy();
});

test("Do Add To Wish List Product Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
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
  await searchPage.addToWishList(productName);
  const successMessageFlag = await searchPage.validateSuccessMessage();
  expect(successMessageFlag).toBeTruthy();
});

test("@Web Validate Wish List Product Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const myWishListPage = basePage.getMyWishListPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);
  await yourStorePage.doSearch(productName);
  await searchPage.addToWishList(productName);
  await searchPage.clickOnTheWishList();
  const validateWishListFlag = await myWishListPage.validateWishList(
    productName
  );
  expect(validateWishListFlag).toBeTruthy();
});

test("Add To Cart Thru Wish List Product Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const myWishListPage = basePage.getMyWishListPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);
  await yourStorePage.doSearch(productName);
  await searchPage.addToWishList(productName);
  await searchPage.clickOnTheWishList();
  await myWishListPage.doAddToCartWishList(productName);
  const successMessageFlag = await myWishListPage.validateSuccessMessage();
  expect(successMessageFlag).toBeTruthy();
});

test("@Web Remove From Cart Thru Wish List Product Test", async ({ page }) => {
  const email = dataSet.email;
  const psw = dataSet.password;
  const productName = dataSet.productName;
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const loginPage = basePage.getLoginPage();
  const searchPage = basePage.getSearchPage();
  const myWishListPage = basePage.getMyWishListPage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();

  await loginPage.doLogin(email, psw);
  await loginPage.returnToYourStorePage();

  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);
  await yourStorePage.doSearch(productName);
  await searchPage.addToWishList(productName);
  await searchPage.clickOnTheWishList();
  await myWishListPage.doRemoveFromCartWishList(productName);
  const successMessageFlag = await myWishListPage.validateSuccessMessage();
  expect(successMessageFlag).toBeTruthy();
});
