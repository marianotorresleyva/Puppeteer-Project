import puppeteer  from "puppeteer";
import login from "./login.js";
import {typeList,typeVideo,typeText} from './contentOptions';
let types = {
    "media":typeVideo,
    "document":typeText,
    "list":typeList
}

(async ()=>{
    let {browser,page} = await login()
    await page.waitForTimeout(3000)
    console.log("Click in Course");
    await page.click("body > main > div.container.my-courses__sections > section:nth-child(3) > ul > li:nth-child(6)", {
        delay:1000
    })
    
    await page.waitForTimeout(3000)
    await page.click("body > section.course > section > div.course-header-headline.bootcamp-banner-background-theme > div > div > div > a")
    console.log("on course")
    //Logic of programming
    while (url == "this URL") {
        try {
            await page.setRequestInterception(true) 
            page.on("request", req =>{
                const contentType = req.resourceType()
                types(contentType)
            })
            // page.waitForSelector()
            await page.click("body > section > section > header > div > div.task-body-header-actions > a")
            await page.waitForTimeout(3000)
        } catch (error) {
            console.log("Course - Done"); 
            await browser.close()
        }
    }
    await page.waitForTimeout(2000)
    await page.click("#video-player > button")

    await page.waitForTimeout(3000)
    await page.click("body > section > section > header > div > div.task-body-header-actions > a")
    await page.waitForTimeout(3000)
    await browser.close()
})()