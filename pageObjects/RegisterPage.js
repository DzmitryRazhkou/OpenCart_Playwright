class RegisterPage {
  constructor(page) {
    this.page = page;
    this.registerAccountLink = page.locator(
      "ul[class='breadcrumb'] li:last-of-type a"
    );
    this.getFirstName = page.locator("#input-firstname");
    this.getLastName = page.locator("#input-lastname");
    this.getEmail = page.locator("#input-email");
    this.getPhone = page.locator("#input-telephone");
    this.getPassword = page.locator("#input-password");
    this.getConfirmPassword = page.locator("#input-confirm");
    this.agreeCheckBox = page.locator("input[name='agree']");
    this.submitBtn = page.locator("input[type='submit']");
    this.successCreatedMessage = page.locator("#content h1");
    this.alertMesssage = page.locator("div[class='text-danger']");
  }

  async doRegister(first, last, email, password, phone) {
    await this.getFirstName.type(first);
    await this.getLastName.type(last);
    await this.getEmail.type(email);
    await this.getPhone.type(phone);
    await this.getPassword.type(password);
    await this.getConfirmPassword.type(password);
    await this.agreeCheckBox.check();
    await this.submitBtn.click();
  }
}
module.exports = { RegisterPage };
