import puppeteer from 'puppeteer';

(async () => {
  const BROWSER_LOCATION = "/usr/bin/google-chrome"
  const browser = puppeteer.launch({executablePath:BROWSER_LOCATION})
  const page = await browser.newPage();
  await page.goto('https://app.aluracursos.com/loginForm?urlAfterLogin=https://app.aluracursos.com/dashboardhttps://developers.google.com/web/');
  // await page.
  await browser.close();
})();