import puppeteer from 'puppeteer';
import util from '../utils.js';

const BROWSER_LOCATION = "/usr/bin/google-chrome";
(async () => {
  const browser = puppeteer.launch({ headless: false, executablePath: BROWSER_LOCATION })
  const page = await (await browser).newPage();
  await page.goto("http://localhost/");
  // await page.
  await util()

  await browser.close()
})();