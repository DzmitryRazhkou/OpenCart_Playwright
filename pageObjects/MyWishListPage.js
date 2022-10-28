class MyWishListPage {
  constructor(page) {
    this.page = page;
    this.addedWishList = page.locator(
      "table[class='table table-bordered table-hover'] tr td:nth-of-type(2) a"
    );
    this.cartBtn = page.locator("button[data-original-title='Add to Cart']");
    this.removeBtn = page.locator("a[data-original-title='Remove']");
    this.successMessage = page.locator(
      "div[class='alert alert-success alert-dismissible']"
    );
  }

  async doAddToCartWishList(productName) {}
  async doRemoveFromCartWishList(productName) {}
}
module.exports = { MyWishListPage };
