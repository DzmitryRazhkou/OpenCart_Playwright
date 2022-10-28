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
    this.getMyAccount = page.locator("a[title='My Account']");
    this.logOutButton = page.locator(
      "ul[class='dropdown-menu dropdown-menu-right'] li:last-of-type"
    );
    this.logOutLink = page.locator("#content h1");
  }

  async doLogin(email, password) {
    await this.getEmail.type(email);
    await this.getPassword.type(password);
    await this.submitBtn.click();
  }

  async logOut() {
    await this.getMyAccount.click();
    await this.logOutButton.click();
  }

  async returnToYourStorePage() {
    await this.logo.click();
  }

  async validateLogOutLink() {
    const logOutLinkText = await this.logOutLink.textContent();
    console.log(" =====> " + logOutLinkText + " <===== ");
    return await this.logOutLink.isVisible();
  }
}

module.exports = { LoginPage };
