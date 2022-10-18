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
}
module.exports = { YourStorePage };
