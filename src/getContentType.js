import puppeteer from 'puppeteer';
import fs from 'fs/promises';

const CUSTOM_URL = "https://www.youtube.com/watch?v=6KKtr08t7_k"
  // "https://fakestoreapi.com/products/1"
  (async () => {
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/google-chrome-stable",
      headless: false,
      defaultViewport: null,
      devtools: true,
      args: ["--window-size=1080,780", "--window-position=1080,0"]

    })

    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36',
      'upgrade-insecure-requests': '1',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    })
    let response = await page.goto(CUSTOM_URL);

    let dataJson = JSON.stringify(response.headers())
    await page.setRequestInterception(true)
    page.on("request", req => {
      dataJson.concat(req.resourceType() + "Hola amigos")
    })
    await fs.writeFile("./info/alura-point.json", dataJson)
    await page.waitForTimeout(3000)
    // await page.waitForNavigation()
    browser.close()
  })()