class LoginPage {
  constructor(page) {
    this.page = page;
    this.getEmail = page.locator("#input-email");
    this.getPassword = page.locator("#input-password");
    this.submitBtn = page.locator("input[type='submit']");
    this.warning = page.locator(
      "div[class='alert alert-danger alert-dismissible']"
    );
    this.logo = page.locator("img[title='naveenopencart']");
  }

  async doLogin(email, password) {
    await this.getEmail.type(email);
    await this.getPassword.type(password);
    await this.submitBtn.click();
  }

  async returnToYourStorePage() {
    await this.logo.click();
  }
}

module.exports = { LoginPage };
