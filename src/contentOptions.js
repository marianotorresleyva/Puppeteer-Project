import puppeteer from 'puppeteer';

const typeVideo = () => {
    console.log("Video")
}
const typeList = () => {
    console.log("List")
}
const typeText = () => {
    console.log("Text")
}

let optionType = {
    "video": typeVideo,
    "list": typeList,
    "text": typeText
};

const getOptionType = (param = "video") => {
    return optionType[param] ? optionType[param]() : optionType["text"]()
}
(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto("http://localhost/")
    await page.waitForTimeout(3000)
    let text = await page.$eval("bdy > div.main_page > div.content_section.floating_element > div.section_header.section_header_red", el => el.textContent).catch(err => "")
    let list = await page.$eval("#search", el => el.textContent).catch(err => "")
    let video = await page.$eval("body > div.main_page > div.content_section.floating_element > div.section_header.section_header_red", el => el.textContent).catch(err => "")
    if (text) getOptionType("text")
    else if (list) getOptionType("list")
    else if (video) getOptionType()

    browser.close()
})()

// export {
//     typeVideo,
//     typeList,
//     typeText
// }