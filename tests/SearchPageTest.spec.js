const { test, expect } = require("@playwright/test");
const { BasePage } = require("../pageObjects/BasePage");
const dataSet = JSON.parse(JSON.stringify(require("../utils/searchPage.json")));
import { faker } from "@faker-js/faker";

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

test("Do Add To Cart Product Test", async ({ page }) => {
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
