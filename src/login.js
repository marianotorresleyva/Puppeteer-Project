import puppeteer from 'puppeteer';
import { config } from 'dotenv';
config();
export default async function logger () {
  const browser = await puppeteer.launch({
    executablePath:"/usr/bin/google-chrome-stable" ,
  headless:false, 
  defaultViewport:null,
  devtools: true,
  args: ["--window-size=1080,780", "--window-position=1080,0"]

  })
  const page = await browser.newPage();
  await page.goto(process.env.URL);
  await page.waitForTimeout(3000)
  await page.type('#login-email', process.env.GITHUB_USER)
  await page.type('#password', process.env.GITHUB_PWD)
  await page.click('body > div.container > section > section.signin > form > button')
  // await page.waitForNavigation()
  console.log("Inside of");
  return {page,browser}
}