const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/yourStorePage.json"))
);

test("Your Store Logo Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();

  const flag = await yourStorePage.logo.isVisible();
  expect(flag).toBeTruthy();
  console.log(" =====> Logo has been showed up <===== ");
});

test("Your Store Page Title Test", async ({ page }) => {
  const titlePageYourStore = dataSet.titlePage;
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();

  await yourStorePage.launchURL();
  console.log(" =====> " + (await page.title()) + " <===== ");
  await expect(page).toHaveTitle(titlePageYourStore);

  //   //   Logo
  //   const flag = await logo.isVisible();
  //   //   expect(flag).toBeTruthy();
  //   console.log(" =====> Logo has been showed up <===== ");
});

test("Currency Select Test", async ({ page }) => {
  const currency = dataSet.currency;
  const currencySign = dataSet.currencySign;

  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();

  await yourStorePage.launchURL();
  await yourStorePage.currencyBtn.click();
  await yourStorePage.selectCurrency(currency, currencySign);
});

test("Click On The Contact Us Icon Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();
  await yourStorePage.phoneIcon.click();

  const contactUsLink = await yourStorePage.contactUsLink;
  const textContactUs = await contactUsLink.textContent();
  console.log(" =====> " + textContactUs + " <===== ");
  expect(contactUsLink).toHaveText(textContactUs);
});

test("Click On The Register Page Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.registerBtn.click();
  const registerAccountLink = await yourStorePage.registerAccountLink;

  const textRegisterAccountLink = await registerAccountLink.textContent();
  console.log(" =====> " + textRegisterAccountLink + " <===== ");
  expect(registerAccountLink).toHaveText(textRegisterAccountLink);
});

test("Click On The Login Page Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();

  await yourStorePage.myAccount.click();
  await yourStorePage.loginBtn.click();
  const loginLink = await yourStorePage.loginLink;

  const textLoginLink = await loginLink.textContent();
  console.log(" =====> " + textLoginLink + " <===== ");
  expect(loginLink).toHaveText(textLoginLink);
});

test("Click On The Shopping Cart Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const shoppingCartPage = basePage.getShoppingCartPage();
  await yourStorePage.launchURL();

  await yourStorePage.shoppingCartBtn.click();
  const shoppingCartLink = await shoppingCartPage.shoppingCartLink;

  const shoppingCartLinkText = await shoppingCartLink.textContent();
  console.log(" =====> " + shoppingCartLinkText + " <===== ");
  expect(shoppingCartLink).toHaveText(shoppingCartLinkText);
});

test("Click On The CheckOut Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const checkOutPage = basePage.getCheckOutPage();
  await yourStorePage.launchURL();

  await yourStorePage.checkOutBtn.click();
  const checkOutLinkLink = await checkOutPage.checkOutLink;

  const checkOutLinkLinkText = await checkOutLinkLink.textContent();
  console.log(" =====> " + checkOutLinkLinkText + " <===== ");
  expect(checkOutLinkLink).toHaveText(checkOutLinkLinkText);
});

test("Validate Navigation Bars", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const navigationBars = dataSet.navBars;
  await yourStorePage.launchURL();
  const result = await yourStorePage.getNavigationBars(navigationBars);
  expect(result).toBeTruthy();
});

test("Featured Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const yourStorePage = basePage.getYourStorePage();
  const productName = dataSet.product;
  await yourStorePage.launchURL();

  let result = await yourStorePage.getProductList(productName);
  expect(result).toBeTruthy();
});

test("Advertise Quantity Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const qty = dataSet.qty;
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();

  await yourStorePage.adsQuantity(qty);
});

test("Advertise Test", async ({ page }) => {
  const basePage = new BasePage(page);
  const brand = dataSet.brand;
  const yourStorePage = basePage.getYourStorePage();
  await yourStorePage.launchURL();
  const result = await yourStorePage.getAds(brand);
  expect(result).toBeTruthy();
});
