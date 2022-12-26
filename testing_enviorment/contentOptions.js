import ptr from 'puppeteer';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { navigationInsideCourse, lanceBrowser, logDelay, navigationOverWeb, evaluationSelector } from '../src/utils.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config({
    path: path.resolve(__dirname, "../.env.test")
})

// console.log(process.env.MAIN_URL);
navigationOverWeb()
async function main() {

    let { browser, page } = await lanceBrowser(process.env.MAIN_URL)

    await logDelay(page, "Waiting to load Localhost")

    let selector1 = "body > div.main_page > div.content_section.floating_element > div.section_header.section_header_red"
    let selector2 = "null"
    await evaluationSelector(page, { selector1, selector2 })
    await browser.close()
}
// main()