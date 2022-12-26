import puppeteer from "puppeteer";
import login from "./login.js";
import { typeList, typeVideo, typeText } from './contentOptions';
let types = {
    "media": typeVideo,
    "document": typeText,
    "list": typeList
}


    (async () => {
        let { browser, page } = await login()
        await page.waitForTimeout(3000)
        console.log("Click in Course");
        await page.click(click0)

        await page.waitForTimeout(3000)
        await page.click(click1)
        console.log("on course")
        //Logic of programming

    })()