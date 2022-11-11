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
    this.warning = page.locator(
      "div[class='alert alert-danger alert-dismissible']"
    );
    this.success = page.locator(
      "div[class='alert alert-success alert-dismissible']"
    );
    this.pswAlertMinMaxValue = page.locator(
      '"Password must be between 4 and 20 characters!"'
    );
    this.pswAlertUnmatchedValue = page.locator(
      '"Password confirmation does not match password!"'
    );
    this.forgottenPassword = page.locator(
      "div[class='list-group'] a:nth-of-type(3)"
    );
    this.forgottenPasswordLink = page.locator("#content h1");
    this.emailAddressForgotten = page.locator("#input-email");
    this.continueBtn = page.locator("input[type='submit']");
  }

  async doRegister(first, last, email, phone, password) {
    await this.getFirstName.type(first);
    await this.getLastName.type(last);
    await this.getEmail.type(email);
    await this.getPhone.type(phone);
    await this.getPassword.type(password);
    await this.getConfirmPassword.type(password);
    await this.agreeCheckBox.check();
    await this.submitBtn.click();
  }
  async doRegisterDismatchPsw(
    first,
    last,
    email,
    phone,
    password,
    passwordConfirm
  ) {
    await this.getFirstName.type(first);
    await this.getLastName.type(last);
    await this.getEmail.type(email);
    await this.getPhone.type(phone);
    await this.getPassword.type(password);
    await this.getConfirmPassword.type(passwordConfirm);
    await this.agreeCheckBox.check();
    await this.submitBtn.click();
  }
  async doRegisterWithoutAgreementPolicy(first, last, email, phone, password) {
    await this.getFirstName.type(first);
    await this.getLastName.type(last);
    await this.getEmail.type(email);
    await this.getPhone.type(phone);
    await this.getPassword.type(password);
    await this.getConfirmPassword.type(password);
    await this.submitBtn.click();
  }
  async validateForgotYourPasswordLink() {
    const forgottenPasswordText =
      await this.forgottenPasswordLink.textContent();
    console.log(" =====> " + forgottenPasswordText + " <===== ");
    return await this.forgottenPasswordLink.isVisible();
  }
  async sendEmailForPassword(email) {
    await this.emailAddressForgotten.type(email);
    await this.continueBtn.click();
  }
}
module.exports = { RegisterPage };
