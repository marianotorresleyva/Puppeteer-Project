import puppeteer from "puppeteer"
import fs from "node:fs/promises"
import path from "path";
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const URL = "http://localhost/"
let target="body > div.main_page > div.content_section.floating_element > div:nth-child(4) > ul";

(async ()=>{
    const browser = await puppeteer.launch({headless:false})
    const page = await browser.newPage()
    await page.goto(URL)
    let list = (await page.$$eval(target, val => val.map(node => node.textContent.replace(/[ ]{2,}/g,"").trim()))).join()

    await fs.writeFile("data.txt",list)
        .then(()=>console.log("done"))
    await browser.close()
})()