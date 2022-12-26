import ptr from 'puppeteer';
import { config } from 'dotenv';
import fs from 'fs';
import path, { resolve } from 'path';
import dataConfig from '../puppeteerExtraConfiguration.json' assert {"type": "json"}
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
config({
    path: path.resolve(__dirname, "../.env")
});
const CONSTANTES = {
    nextActivityBtnSelector: "body > section > section > header > div > div.task-body-header-actions",
    activitySelector: "#task-content > div > ul",
    playBtnSelector: "#video-player > button",
    usernameSelector: '#login-email',
    passwordSelector: '#password',
    submitBtn: 'body > div.container > section > section.signin > form > button',
    //This course Have to automatizate
    secuencePath: {
        selectCourseGoto: "body > main > div.container.my-courses__sections > section:nth-child(3) > ul > li:nth-child(6) > div",
        accessToCourse: "body > section.course > section > div.course-header-headline.bootcamp-banner-background-theme > div > div > div > a",
    },
    locationFile: `${path.resolve(__dirname, "../info/taskListLinks.txt")}`
}
const lanceBrowser = async (url) => {
    try {
        const browser = await ptr.launch(dataConfig['launch.config'])
        const page = await browser.newPage()
        await page.goto(url)
        return { browser, page }
    } catch (err) {
        console.error(err.message);
        return false;
    }
}
async function login(page) {
    try {
        await page.type(CONSTANTES.usernameSelector, process.env.GITHUB_USER)
        await page.type(CONSTANTES.passwordSelector, process.env.GITHUB_PWD)
        await page.click(CONSTANTES.submitBtn)
        await logDelay(page, "Login Done, were inside")
    } catch (err) {
        console.log(err.message);
    }

}
async function logDelay(
    page,
    reason = "Waiting...",
    time = 3000,
) {

    //The page come from the context where is executed
    console.log(`%c ${reason}`, "color:white;background:yellow;");
    await page.waitForTimeout(time)
}
async function navigationOverWeb(page) {
    if (!(page)) throw Error("Page Instace Left")
    for (const selector of Object.values(CONSTANTES.secuencePath)) {
        await nextActivityBtn(page, selector)
    }
};
async function nextActivityBtn(page, nextPage = undefined) {
    try {
        const element = await page.$(nextPage || CONSTANTES.nextActivityBtnSelector);
        await element.click(nextActivityBtn);
        await logDelay(page, "Waiting for Navigation")
    } catch (err) {
        console.log(`Next Activity Button Error: Maybe doesn't found`);
        console.log(`En ${new URL(page.url()).pathname}: No se pudo encontrar el selector:\n${selector}`)
        return false
    }
}
async function videoUrl(page) {
    try {
        await page.$eval(
            CONSTANTES.playBtnSelector,
            (el) => el.click()
        )
        await logDelay(page, "Waiting 3s to video playing.")
        nextActivityBtn(page)
        return await page.url();
    } catch (err) {
        console.log(`
            MSG:  Error on VideoURL Function
            EO: ${err.message}
        `);
        return false
    }
}
const insertTaskInList = (task_url) => {
    if (!(fs.existsSync(CONSTANTES.locationFile))) {
        fs.appendFileSync(CONSTANTES.locationFile, task_url)
    }
    fs.writeFileSync(CONSTANTES.locationFile, task_url)

}
async function activityListUrl(page) {
    try {
        await page.$eval(CONSTANTES.activitySelector)
        let task_url = new URL(page.url())
        insertTaskInList(task_url)
        nextActivityBtn(page)
        return await page.url();
    } catch (err) {
        console.log(`
            MSG:  Error on ActivityURL Function
            EO: ${err.message}
        `);
        return false
    }

}
async function evaluationSelector(page) {
    await Promise.any([
        new Promise(resolve => resolve(videoUrl(page))),
        new Promise(resolve => resolve(activityListUrl(page)))
    ])
        .catch(async err => {
            console.log(`Is not a video, Is not a list of activities. 
            Is text only
            `);
            nextActivityBtn(page)
            return await page.url()
        })
}
const navigationInsideCourse = async (page, url) => {
    const finalURL = url
    while (url == finalURL) {
        try {
            url = await evaluationSelector(page)
        } catch (error) {
            console.log(error);
        }

    }
    /** Maybe the evaluation is not catch correctly the error
     * 
     * This error occur here
     * MSG:  Error on ActivityURL Function
            EO: Error: failed to find element matching selector "#task-content > div > ul"
        

            MSG:  Error on VideoURL Function
            EO: Error: failed to find element matching selector "#video-player > button"
        

            MSG:  Error on ActivityURL Function
            EO: Error: failed to find element matching selector "#task-content > div > ul"
        

            MSG:  Error on VideoURL Function
            EO: Error: failed to find element matching selector "#video-player > button"
        

            MSG:  Error on ActivityURL Function
            EO: Error: failed to find element matching selector "#task-content > div > ul"
     * 
     */
}

export {
    logDelay,
    evaluationSelector,
    navigationOverWeb,
    navigationInsideCourse,
    login,
    lanceBrowser

}