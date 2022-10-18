class MyAccountPage {
  constructor(page) {
    this.page = page;

    this.submitBtn = page.locator("input[type='submit']");
    this.myAccountLink = page.locator("ul[class='breadcrumb'] li:last-of-type");
  }
}
module.exports = { MyAccountPage };
