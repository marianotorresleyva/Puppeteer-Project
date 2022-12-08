import puppeteer  from "puppeteer";
const BROWSER_LOCATION = "/usr/bin/google-chrome"
const URL = "http://localhost/";
const target = "body > div.main_page > div.content_section.floating_element > div.section_header.section_header_red";
(async () => {
    const browser = await puppeteer.launch({executablePath:BROWSER_LOCATION,headless:false});
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForSelector(target,{visible:true})
    let title = await page.$eval(target,el=>el.textContent)
    console.log(title);

})();