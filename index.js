const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Close the browser
    await browser.close();
  } catch (err) {
    console.log({ err });
  }
})();

