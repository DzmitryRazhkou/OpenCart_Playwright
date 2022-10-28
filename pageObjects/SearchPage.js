class SearchPage {
  constructor(page) {
    this.page = page;
    this.productNames = page.locator(
      "div[class='row'] div div div div div h4 a"
    );
    this.productAddToCarts = page.locator(
      "div[class='row'] div div div div div div:nth-child(2):nth-child(2) button:nth-of-type(1):first-of-type"
    );
    this.successMessage = page.locator(
      "div[class='alert alert-success alert-dismissible']"
    );
    this.cart = page.locator("#cart");
    this.checkOutBtn = page.locator("p[class='text-right'] a:last-of-type");
    this.addWishList = page.locator(
      "div[class='row'] div div div div div button:nth-of-type(2)"
    );
    this.wishListBtn = page.locator(
      "div[class='alert alert-success alert-dismissible'] a:last-of-type"
    );
  }

  async doClickOnTheCheckOut() {
    await this.cart.click();
    await this.checkOutBtn.click();
  }
  async addToCartProduct(productName) {
    const count = await this.productNames.count();
    for (let i = 0; i < count; i++) {
      console.log(await this.productNames.nth(i).allTextContents());
      if (
        (await this.productNames.nth(i).allTextContents()).includes(productName)
      ) {
        await this.productAddToCarts.nth(i).click();
      }
    }
    await this.page.waitForLoadState("networkidle");
  }
  async addToWishList(productName) {
    const count = await this.productNames.count();
    for (let i = 0; i < count; i++) {
      console.log(await this.productNames.nth(i).allTextContents());
      if (
        (await this.productNames.nth(i).allTextContents()).includes(productName)
      ) {
        await this.addWishList.nth(i).click();
      }
    }
    await this.page.waitForLoadState("networkidle");
  }
  async clickOnTheWishList() {
    this.wishListBtn.click();
  }
  async validateSuccessMessage() {
    const successMessageText = await this.successMessage.textContent();
    console.log(" =====> " + successMessageText + " <===== ");
    return await this.successMessage.isVisible();
  }
  async proceedToCheckOut() {
    await this.cart.click();
    await this.checkOutBtn.click();
  }
}
module.exports = { SearchPage };
