class MyWishListPage {
  constructor(page) {
    this.page = page;
    this.addedWishList = page.locator(
      "table[class='table table-bordered table-hover'] tr td:nth-of-type(2) a"
    );
    this.table = page.locator("div[class='table-responsive']");
    this.cartBtn = page.locator("button[data-original-title='Add to Cart']");
    this.removeBtn = page.locator("a[data-original-title='Remove']");
    this.successMessage = page.locator(
      "div[class='alert alert-success alert-dismissible']"
    );
    this.successMessage = page.locator(
      "div[class='alert alert-success alert-dismissible']"
    );
  }

  async validateWishList(productName) {
    const count = await this.addedWishList.count();
    console.log(await this.addedWishList.allTextContents());

    for (let i = 0; i < count; i++) {
      if (
        (
          " =====> " +
          (await this.addedWishList.nth(i).allTextContents()) +
          " <===== "
        ).includes(productName)
      ) {
        console.log(await this.addedWishList.nth(i).textContent());
        return await this.addedWishList.nth(i).isVisible();
      }
    }
    console.log(" =====> Wish List doesn't contain provided product <===== ");
  }

  async doAddToCartWishList(productName) {
    const count = await this.addedWishList.count();
    console.log(await this.addedWishList.allTextContents());

    for (let i = 0; i < count; i++) {
      if (
        (await this.addedWishList.nth(i).allTextContents()).includes(
          productName
        )
      ) {
        console.log(await this.addedWishList.nth(i).textContent());
        await this.cartBtn.nth(i).click();
        break;
      }
    }
  }

  async doRemoveFromCartWishList(productName) {
    const count = await this.addedWishList.count();
    console.log(await this.addedWishList.allTextContents());

    for (let i = 0; i < count; i++) {
      if (
        (await this.addedWishList.nth(i).allTextContents()).includes(
          productName
        )
      ) {
        console.log(await this.addedWishList.nth(i).textContent());
        await this.removeBtn.nth(i).click();
        break;
      }
    }
  }

  async validateSuccessMessage() {
    const successMessageText = await this.successMessage.textContent();
    console.log(" =====> " + successMessageText + " <===== ");
    return await this.successMessage.isVisible();
  }
}
module.exports = { MyWishListPage };
