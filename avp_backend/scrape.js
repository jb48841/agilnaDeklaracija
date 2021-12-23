const { writeFile } = require("fs").promises;
const puppeteer = require("puppeteer");
// trazi poziciju karaktera u stringu
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

// npr. 1 => 001
function convertToString(num) {
  if (num < 10) {
    return String(num).padStart(3, "0");
  }
  if (num < 100 && num > 10) {
    return String(num).padStart(3, "0");
  }
  return String(num);
}

const minimal_args = [
  "--autoplay-policy=user-gesture-required",
  "--disable-background-networking",
  "--disable-background-timer-throttling",
  "--disable-backgrounding-occluded-windows",
  "--disable-breakpad",
  "--disable-client-side-phishing-detection",
  "--disable-component-update",
  "--disable-default-apps",
  "--disable-dev-shm-usage",
  "--disable-domain-reliability",
  "--disable-extensions",
  "--disable-features=AudioServiceOutOfProcess",
  "--disable-hang-monitor",
  "--disable-ipc-flooding-protection",
  "--disable-notifications",
  "--disable-offer-store-unmasked-wallet-cards",
  "--disable-popup-blocking",
  "--disable-print-preview",
  "--disable-prompt-on-repost",
  "--disable-renderer-backgrounding",
  "--disable-setuid-sandbox",
  "--disable-speech-api",
  "--disable-sync",
  "--hide-scrollbars",
  "--ignore-gpu-blacklist",
  "--metrics-recording-only",
  "--mute-audio",
  "--no-default-browser-check",
  "--no-first-run",
  "--no-pings",
  "--no-sandbox",
  "--no-zygote",
  "--password-store=basic",
  "--use-gl=swiftshader",
  "--use-mock-keychain",
  "--disable-gpu",
];

async function scrape() {
  const browser = await puppeteer.launch({
    args: minimal_args,
    browserWSEndpoint:
      "wss://chrome.browserless.io?--user-data-dir=/tmp/session-123",
  });
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  //ovo se dodaje da bi se izbjeglo ucitavanja slika, css-a i slicno.. radi brzeg dohvacanja podataka
  page.on("request", (request) => {
    if (
      ["image", "stylesheet", "font", "script"].indexOf(
        request.resourceType()
      ) !== -1
    ) {
      return request.abort();
    }
    request.continue();
  });

  let names = [];
  console.time("signatures");

  for (let i = 1; i < 392; i++) {
    await page.goto(
      `https://agilemanifesto.org/display/000000${convertToString(i)}.html`,
      { waitUntil: "domcontentloaded" }
    );
    const data = await page.evaluate(() => {
      const tds = Array.from(document.querySelectorAll("td"));
      return tds.map((td) => td.innerHTML.split("<hr>"));
    });
    data.splice(0, 4);
    data.forEach((line) => {
      line.forEach((el) => {
        let indexOfCharacter1 = getPosition(el, ">", 1);
        let indexOfCharacter2 = getPosition(el, "<", 2);
        names.push(el.substring(indexOfCharacter1 + 1, indexOfCharacter2));
      });
    });
    names.splice(-3, 3);
  }
  console.timeEnd("signatures");
  browser.close();
  return names;
}

const setScraperTask = async () => {
  setInterval(async () => {
    const names = await scrape();
    await writeFile("names.txt", JSON.stringify(names), {
      encoding: "utf8",
      flag: "w",
    });
  }, 10000 * 60 * 60 * 3);
  // updateaj file svakih 3h
};

module.exports = setScraperTask;
