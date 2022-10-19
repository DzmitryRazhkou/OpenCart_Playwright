const { expect } = require("@playwright/test");

class YourStorePage {
  constructor(page) {
    this.page = page;
    this.currencyBtn = page.locator(
      "button[class='btn btn-link dropdown-toggle']"
    );
    this.currencyList = page.locator("ul[class='dropdown-menu'] li");
    this.currencySign = page.locator(
      "button[class='btn btn-link dropdown-toggle'] strong"
    );
    this.phoneIcon = page.locator("i[class='fa fa-phone']");
    this.contactUsLink = page.locator("#content h1");
    this.myAccount = page.locator("a[title='My Account']");
    this.registerBtn = page.locator(
      "ul[class='dropdown-menu dropdown-menu-right'] li:first-of-type"
    );
    this.registerAccountLink = page.locator("#content h1");
    this.loginBtn = page.locator(
      "ul[class='dropdown-menu dropdown-menu-right'] li:last-of-type"
    );
    this.loginLink = page.locator("ul[class='breadcrumb'] li:last-of-type a");
    this.shoppingCartBtn = page.locator(
      "ul[class='list-inline'] li:nth-of-type(4)"
    );
    this.checkOutBtn = page.locator(
      "ul[class='list-inline'] li:nth-of-type(5)"
    );
    this.navigationBars = page.locator("ul[class='nav navbar-nav'] li");
    this.productList = page.locator(
      "div[class='product-layout col-lg-3 col-md-3 col-sm-6 col-xs-12'] div[class='caption'] h4 a"
    );
    this.ads = page.locator(
      "div[class='carousel swiper-viewport'] div div img"
    );
  }

  async launchURL() {
    await this.page.goto("https://naveenautomationlabs.com/opencart/");
  }

  async selectCurrency(currency, expectedCurrencySign) {
    const count = await this.currencyList.count();
    console.log(await this.currencyList.allTextContents());
    for (let i = 0; i < count; i++) {
      if ((await this.currencyList.nth(i).textContent()).includes(currency)) {
        await this.currencyList.nth(i).click();
        break;
      }
      await expect(await this.currencySign).toHaveText(expectedCurrencySign);
    }
  }
  async getNavigationBars(bar) {
    const count = await this.navigationBars.count();
    const titles = await this.navigationBars.allTextContents();
    console.log();
    for (let i = 0; i < count; i++) {
      if (await titles.includes(bar)) {
        console.log(" =====> " + bar + " <===== ");
        return true;
      } else {
        console.log("Please provide the product from the list");
        return false;
      }
    }
  }
  async getProductList(productName) {
    const count = await this.productList.count();
    const productListText = await this.productList.allTextContents();
    console.log(productListText);
    for (let i = 0; i <= count; i++) {
      if (productListText.includes(productName)) {
        console.log(" =====> " + productName + " <===== ");
        return true;
      } else {
        console.log("Please provide the product from the list");
        return false;
      }
    }
  }
  async adsQuantity(qty) {
    const countOfAds = await this.ads.count();
    console.log(
      " =====> The Quantity of Advertise is " +
        countOfAds +
        " Companies. <===== "
    );
    expect(countOfAds).toEqual(qty);
  }

  async getAds(brand) {
    const list = [];
    const attrs = await this.ads;
    const count = await this.ads.count();
    for (let i = 0; i < count; i++) {
      let s = await attrs.nth(i).getAttribute("alt");
      list.push(s);
    }
    if (list.includes(brand)) {
      for (const el of list) {
        console.log(el);
      }
      console.log(" =====> " + brand + " <===== ");
      return true;
    } else {
      console.log(" =====> Provide another brand <===== ");
      return false;
    }
  }
}
module.exports = { YourStorePage };
