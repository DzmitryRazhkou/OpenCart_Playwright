class ContactUsPage {
  constructor(page) {
    this.page = page;
    this.yourName = page.locator("#input-name");
    this.email = page.locator("#input-email");
    this.enquiry = page.locator("#input-enquiry");
    this.submit = page.locator("input[type='submit']");
    this.getSuccessMessage = page.locator("#content p");
    this.dangerAlert = page.locator("div[class='text-danger']");
  }

  createString(lengthOfString) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let leng = lengthOfString;
    let randomString = "";
    for (let i = 0; i < leng; i++) {
      const randomNumber = Math.floor(Math.random() * characters.length);
      randomString += characters[randomNumber];
    }
    return randomString;
  }

  async doContactUs(yourName, email, enquiry) {
    await this.yourName.type(yourName);
    await this.email.type(email);
    await this.enquiry.type(enquiry);
    await this.submit.click();
  }
}
module.exports = { ContactUsPage };
