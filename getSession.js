const puppeteer = require("puppeteer");
const fs = require("fs");
const readline = require("readline");

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function loadLocalStorage(page) {
  const localStorageData = JSON.parse(fs.readFileSync("localstorage.json"));

  await page.evaluate((data) => {
    for (let key in data) {
      localStorage.setItem(key, data[key]);
    }
  }, localStorageData);
}

// async function runGetSession() {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   await page.goto("https://web.telegram.org/a/#7249432100");

//   const answer = await askQuestion("Sudah login? (y/n): ");

//   if (answer.toLowerCase() === "y") {
//     const localStorageData = await page.evaluate(() => {
//       let data = {};
//       for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         data[key] = localStorage.getItem(key);
//       }
//       return data;
//     });

//     fs.writeFileSync(
//       "localstorage.json",
//       JSON.stringify(localStorageData, null, 2)
//     );

//     console.log("LocalStorage telah disimpan dalam file localstorage.json");
//   } else {
//     if (fs.existsSync("localstorage.json")) {
//       console.log("Muat localStorage dari file localstorage.json");
//       await loadLocalStorage(page);
//       await page.reload();

//       console.log("Login otomatis menggunakan localStorage berhasil.");

//       const newPage = await browser.newPage();
//       await newPage.goto("https://web.telegram.org/a/#7249432100");

//       await newPage.waitForSelector("span.bot-menu-text");
//       await newPage.click("span.bot-menu-text");

//       console.log('Clicked on the "start" button.');

//       await newPage.waitForSelector(
//         "button.Button.confirm-dialog-button.default.primary.text",
//         { visible: true }
//       );
//       await newPage.click(
//         "button.Button.confirm-dialog-button.default.primary.text"
//       );

//       console.log('Clicked on the "Confirm" button in the popup.');

//       await delay(5000);
//       await newPage.waitForSelector("iframe.OmY14FFl");
//       const frameHandle = await newPage.$("iframe.OmY14FFl");
//       const frame = await frameHandle.contentFrame();
//       await delay(5000);
//       const initData = await frame.evaluate(() => {
//         return window.Telegram.WebApp.initData;
//       });
//       console.log(initData);
//       return initData;
//     } else {
//       console.log(
//         "File localstorage.json tidak ditemukan. Silakan login terlebih dahulu."
//       );
//     }
//   }

//   await browser.close();
// }

async function runGetSession() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://web.telegram.org/a/#7249432100");

  // Remove the question prompt for login confirmation
  const localStorageExists = fs.existsSync("localstorage.json");

  if (localStorageExists) {
    console.log("Muat localStorage dari file localstorage.json");
    await loadLocalStorage(page);
    await page.reload();

    console.log("Login otomatis menggunakan localStorage berhasil.");

    const newPage = await browser.newPage();
    await newPage.goto("https://web.telegram.org/a/#7249432100");

    await newPage.waitForSelector("span.bot-menu-text");
    await newPage.click("span.bot-menu-text");

    console.log('Clicked on the "start" button.');

    await newPage.waitForSelector(
      "button.Button.confirm-dialog-button.default.primary.text",
      { visible: true }
    );
    await newPage.click(
      "button.Button.confirm-dialog-button.default.primary.text"
    );

    console.log('Clicked on the "Confirm" button in the popup.');

    await delay(5000);
    await newPage.waitForSelector("iframe.OmY14FFl");
    const frameHandle = await newPage.$("iframe.OmY14FFl");
    const frame = await frameHandle.contentFrame();
    await delay(5000);
    const initData = await frame.evaluate(() => {
      return window.Telegram.WebApp.initData;
    });
    console.log(initData);
    return initData;
  } else {
    console.log(
      "File localstorage.json tidak ditemukan. Silakan login terlebih dahulu."
    );
  }

  await browser.close();
}

module.exports = runGetSession;
