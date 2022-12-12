import puppeteer from 'puppeteer';
import { config } from 'dotenv';
config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (
      interceptedRequest.url().endsWith('.png') ||
      interceptedRequest.url().endsWith('.jpg')
    )
      interceptedRequest.abort();
    else interceptedRequest.continue();
  });
  await page.goto('https://example.com');
  await browser.close();
})();