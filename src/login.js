import puppeteer from 'puppeteer';
import { config } from 'dotenv';
config();
(async () => {
  const browser = await puppeteer.launch({headless:false})
  const page = await browser.newPage();
  await page.goto(process.env.URL);
  await page.type('#login-email', process.env.GITHUB_USER)
  await page.type('#password', process.env.GITHUB_PWD)
  await page.click('body > div.container > section > section.signin > form > button')
  await page.waitForTimeout(5000)

  await browser.close();
})();