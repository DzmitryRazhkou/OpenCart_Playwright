class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartLink = page.locator("#content h1");
  }
}

module.exports = { ShoppingCartPage };
