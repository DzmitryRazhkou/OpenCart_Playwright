const { YourStorePage } = require("./YourStorePage");
const { ContactUsPage } = require("./ContactUsPage");
const { RegisterPage } = require("./RegisterPage");
const { LoginPage } = require("./LoginPage");
const { MyAccountPage } = require("./MyAccountPage");
const { SearchPage } = require("./SearchPage");
const { ShoppingCartPage } = require("./ShoppingCartPage");
const { CheckOutPage } = require("./CheckOutPage");

class BasePage {
  constructor(page) {
    this.page = page;
    this.yourStorePage = new YourStorePage(this.page);
    this.contactUsPage = new ContactUsPage(this.page);
    this.registerPage = new RegisterPage(this.page);
    this.loginPage = new LoginPage(this.page);
    this.myAccountPage = new MyAccountPage(this.page);
    this.searchPage = new SearchPage(this.page);
    this.shoppingCartPage = new ShoppingCartPage(this.page);
    this.checkOutPage = new CheckOutPage(this.page);
  }

  getYourStorePage() {
    return this.yourStorePage;
  }
  getContactUsPage() {
    return this.contactUsPage;
  }
  getRegisterPage() {
    return this.registerPage;
  }
  getLoginPage() {
    return this.loginPage;
  }
  getMyAccountPage() {
    return this.myAccountPage;
  }
  getSearchPage() {
    return this.searchPage;
  }
  getShoppingCartPage() {
    return this.shoppingCartPage;
  }
  getCheckOutPage() {
    return this.checkOutPage;
  }
}
module.exports = { BasePage };
