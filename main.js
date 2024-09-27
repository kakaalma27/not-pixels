const axios = require("axios");
const fs = require("fs");
const os = require("os");
const readline = require("readline");
const runGetSession = require("./getSession");

const userAgentGenerator = {
  edge: function () {
    const edgeVersion = Math.floor(Math.random() * 100) + 90;
    const chromeVersion = Math.floor(Math.random() * 100) + 96;
    const safariVersion = Math.floor(Math.random() * 100) + 10;
    const webkitVersion = Math.floor(Math.random() * 700) + 500;
    const osPlatform =
      os.platform() === "win32"
        ? "Windows NT 10.0; Win64; x64"
        : "Macintosh; Intel Mac OS X 10_15_17";
    const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/${webkitVersion}.36 Edg/${edgeVersion}.0.1901.203`;
    return userAgent;
  },
  chrome: function () {
    const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
    const chromeVersion = Math.floor(Math.random() * 100) + 96;
    const webkitVersion = Math.floor(Math.random() * 700) + 500;
    const osPlatform =
      os.platform() === "win32"
        ? `Windows NT ${windowsNtVersion}.0; Win64; x64`
        : "Macintosh; Intel Mac OS X 10_15_17";
    const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.3163.100 Safari/${webkitVersion}.36`;
    return userAgent;
  },
  firefox: function () {
    const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
    const firefoxVersion = Math.floor(Math.random() * 26) + 95;
    const geckoVersion = Math.floor(Math.random() * 30) + 20100101;
    const osPlatform =
      os.platform() === "win32"
        ? `Windows NT ${windowsNtVersion}.0; Win64; x64`
        : "Macintosh; Intel Mac OS X 10_15_17";
    const userAgent = `Mozilla/5.0 (${osPlatform}; rv: ${firefoxVersion}.0) Gecko/${geckoVersion} Firefox/${firefoxVersion}.0`;
    return userAgent;
  },
  safari: function () {
    const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
    const safariVersion = Math.floor(Math.random() * 100) + 10;
    const webkitVersion = Math.floor(Math.random() * 100) + 500;
    const osPlatform =
      os.platform() === "win32"
        ? `Windows NT ${windowsNtVersion}.0; Win64; x64`
        : "Macintosh; Intel Mac OS X 10_15_17";
    const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) Version/${safariVersion}.1.15 Safari/${webkitVersion}.1.15`;
    return userAgent;
  },
  android: function () {
    const edgeVersion = Math.floor(Math.random() * 25) + 90;
    const androidVersion = Math.floor(Math.random() * 8) + 5;
    const chromeVersion = Math.floor(Math.random() * 20) + 96;
    const webkitVersion = Math.floor(Math.random() * 700) + 500;
    const osPlatform = Math.floor(Math.random() * 10);
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersion}.${osPlatform}; K) AppleWebKit/5${webkitVersion}37.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Mobile Safari/${webkitVersion}.36 EdgA/${edgeVersion}.0.1901.196`;
    return userAgent;
  },
  ios: function () {
    const iosVersion = Math.floor(Math.random() * 8) + 9;
    const edgeVersion = Math.floor(Math.random() * 25) + 90;
    const safariVersion = Math.floor(Math.random() * 6) + 10;
    const webkitVersion = Math.floor(Math.random() * 700) + 500;
    const osPlatform = Math.floor(Math.random() * 10);
    const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion}_${osPlatform} like Mac OS X) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) EdgiOS/${edgeVersion}.0.1901.187 Version/${safariVersion}.0 Mobile/15E148 Safari/${webkitVersion}.1`;
    return userAgent;
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/get-data");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getUser(initData, randomUserAgent) {
  await sleep(10000);
  return axios.get("https://notpx.app/api/v1/users/me", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      authorization: `initData ${initData}`,
      "User-Agent": randomUserAgent,
      priority: "u=1, i",
      Referer: "https://image.notpx.app/",
      origin: "https://image.notpx.app",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-ch-ua":
        '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129", "Microsoft Edge WebView2";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    },
  });
}

async function getUserInfo(initData, randomUserAgent) {
  await sleep(10000);
  return axios.get("https://notpx.app/api/v1/mining/status", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-encoding": "gzip, deflate, br, zstd",
      "accept-language": "en-US,en;q=0.9",
      authorization: `initData ${initData}`,
      "User-Agent": randomUserAgent,
      priority: "u=1, i",
      Referer: "https://image.notpx.app/",
      origin: "https://image.notpx.app",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-ch-ua":
        '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129", "Microsoft Edge WebView2";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
    },
  });
}

function getRandomPixelId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function performAction(initData, pixelId, newColor, randomUserAgent) {
  await sleep(10000);
  return axios.post(
    "https://notpx.app/api/v1/repaint/start",
    {
      pixelId,
      newColor,
    },
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        authorization: `initData ${initData}`, // Bearer token passed here
        "content-type": "application/json",
        "content-length": 39,
        "User-Agent": randomUserAgent,
        priority: "u=1, i",
        Referer: "https://image.notpx.app/",
        origin: "https://image.notpx.app",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-ch-ua":
          '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129", "Microsoft Edge WebView2";v="129"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
      },
    }
  );
}

function bearerToken() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let bearerQueries = []; // Initialize as an array

    function askForToken() {
      rl.question(
        "Enter your bearerToken (or type 'done' to finish): ",
        (priv_key) => {
          if (priv_key.toLowerCase() === "done") {
            rl.close();
            resolve(bearerQueries); // Resolve with the array
          } else {
            bearerQueries.push(priv_key); // Add the new token to the array
            askForToken();
          }
        }
      );
    }

    askForToken();
  });
}

let randomUserAgent = userAgentGenerator.chrome();

const main = async () => {
  while (true) {
    let initData;
    if (fs.existsSync("initData.json")) {
      const storedData = JSON.parse(fs.readFileSync("initData.json"));
      initData = storedData.initData;
    }

    if (!initData) {
      console.log("Fetching initData using getSession...");
      initData = await runGetSession();
      fs.writeFileSync("initData.json", JSON.stringify({ initData }));
    } else {
      console.log("Using existing initData:", initData);
    }

    let bearerQueries = initData;
    console.log(bearerQueries);

    let user = await getUser(bearerQueries, randomUserAgent);
    let userInfo = await getUserInfo(bearerQueries, randomUserAgent);
    let name = user.data.firstName;
    let charges = userInfo.data.charges;
    let repaintsTotal = userInfo.data.repaintsTotal;

    console.log("Berhasil Login...");
    console.log("name :", name);
    console.log("Before");
    console.log("charges :", charges);
    console.log("repaintsTotal :", repaintsTotal);

    while (charges > 0) {
      try {
        let randomPixelId = getRandomPixelId(4002, 366308);
        let pixelId = randomPixelId;
        let newColor = "#e46e6e";

        let output = await performAction(
          bearerQueries,
          pixelId,
          newColor,
          randomUserAgent
        );

        if (output.status === 401) {
          console.log("Unauthorized. Fetching new initData...");
          initData = await runGetSession();
          fs.writeFileSync("initData.json", JSON.stringify({ initData }));
          bearerQueries = initData;
          continue;
        }

        console.log(output.data.balance);
        userInfo = await getUserInfo(bearerQueries, randomUserAgent);
        charges = userInfo.data.charges;
        repaintsTotal = userInfo.data.repaintsTotal;

        console.log("charges :", charges);
        console.log("repaintsTotal :", repaintsTotal);
      } catch (e) {
        console.error("Error in performing color change:", e);
      }
    }

    console.log("All charges have been used up.");

    await sleep(900000);
  }
};
main();
