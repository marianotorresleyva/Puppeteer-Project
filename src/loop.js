import puppeteer  from "puppeteer";
import login from "./login.js";
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
    await page.waitForTimeout(2000)
    await page.click("#video-player > button")

    await page.waitForTimeout(3000)
    await page.click("body > section > section > header > div > div.task-body-header-actions > a")
    await page.waitForTimeout(3000)
    await browser.close()
})()