const puppeteer = require("puppeteer");
const fs = require("fs");

const getResult = (async (payload) => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate the page to a URL
    await page.goto("https://www.google.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type the search query
    await page.type("*[name='q']", payload?.searchTerm);

    // Pressing "Enter" key to start search processing
    await page.keyboard.press("Enter");

    // Waiting for Google to process the search
    await page.waitForNavigation();

    // getting the title of the result and mapping to get one by one
    const arr = await page.$$eval(".yuRUbf h3", (titles) => {
      return titles.map((title, index) => `${index+1}. ${title.textContent}`);
    });

    // getting the result in console
    console.log(arr);

    // saving the titles in a txt file
    await fs.writeFile(`${payload?.fileName}.txt`, arr.join("\r\n"), (err) => {
      if (err) {
        console.error("Error writing file:", err);
      } else {
        console.log("File written successfully!");
      }
    });
    

    // Capture a screenshot
    await page.screenshot({
      path: "result.png",
    });

    // Close the browser
    await browser.close();
    
  } catch (err) {
    console.log({ err });
  }
});


// search Terms and file name
const searchTopics = [
  {searchTerm : 'Javascript',
    fileName : 'javascript',
  },
  {searchTerm : 'python automation',
    fileName : 'python',
  },
  {searchTerm : 'all about programming',
    fileName : 'programming',
  },
]


for (const searchTopic of searchTopics) {
  getResult(searchTopic)
}

