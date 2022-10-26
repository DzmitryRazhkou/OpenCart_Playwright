const { expect } = require("@playwright/test");

class ShoppingCartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCartLink = page.locator("#content h1");

    this.continueBtn = page.locator("input[value='Continue']");
    this.getExistingAddressRadio = page.locator(
      "div[class='radio']:nth-child(1) label"
    );
    this.getNewAddressRadio = page.locator(
      "div[class='radio']:nth-child(3) label"
    );
    this.commentField = page.locator("textarea[name='comment']");
    this.checkBox = page.locator("input[type='checkbox']");
    this.continuePaymentMethod = page.locator("#button-payment-method");
    this.warningAlert = page.locator(
      "div[class='alert alert-danger alert-dismissible']"
    );

    this.getFirstName = page.locator("#input-payment-firstname");
    this.getLastName = page.locator("#input-payment-lastname");
    this.getCompany = page.locator("#input-payment-company");
    this.getAddressFirst = page.locator("#input-payment-address-1");
    this.getAddressSecond = page.locator("#input-payment-address-2");
    this.getCity = page.locator("#input-payment-city");
    this.getZip = page.locator("#input-payment-postcode");

    this.country = page.locator("#input-payment-country");
    this.state = page.locator("#input-payment-zone");
  }

  async selectAddress(typeOfAddress) {
    var existingAddressTxt = await this.getExistingAddressRadio.textContent();
    existingAddressTxt = existingAddressTxt.trim();
    if (existingAddressTxt.includes(typeOfAddress)) {
      await this.getExistingAddressRadio.click();
      console.log(" =====> " + existingAddressTxt + " <===== ");
    } else {
      var newAddressTxt = await this.getNewAddressRadio.textContent();
      newAddressTxt = newAddressTxt.trim();
      await this.getNewAddressRadio.click();
      console.log(" =====> " + newAddressTxt + " <===== ");
    }
  }

  async clickContinueButtton() {
    await this.continueBtn.click();
  }

  async selectCountry(countryName) {
    await this.country.selectOption({ label: countryName });
    expect(await this.country.textContent()).toContain(countryName);
  }

  async selectState(stateName) {
    await this.state.selectOption({ label: stateName });
    expect(await this.state.textContent()).toContain(stateName);
  }

  async paymentMethod(comment) {
    await this.commentField.fill(comment);
    await this.checkBox.check();
    expect(await this.checkBox.isChecked()).toBeTruthy();
    await this.continuePaymentMethod.click();
  }

  async doFillUpBillingDetails(
    firstname,
    lastname,
    company,
    address1,
    address2,
    city,
    zip,
    country,
    state
  ) {
    await this.getFirstName.type(firstname);
    await this.getLastName.type(lastname);
    await this.getCompany.type(company);
    await this.getAddressFirst.type(address1);
    await this.getAddressSecond.type(address2);
    await this.getCity.type(city);
    await this.getZip.type(zip);
    await this.selectCountry(country);
    await this.selectState(state);
  }
}

module.exports = { ShoppingCartPage };
