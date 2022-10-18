class CheckOutPage {
  constructor(page) {
    this.page = page;
    this.checkOutLink = page.locator("#content h1");
  }
}

module.exports = { CheckOutPage };
