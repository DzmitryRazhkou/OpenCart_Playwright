const { YourStorePage } = require("./YourStorePage");

class BasePage {
  constructor(page) {
    this.page = page;
    this.yourStorePage = new YourStorePage(this.page);
  }

  getYourStorePage() {
    return this.yourStorePage;
  }
}
module.exports = { BasePage };
