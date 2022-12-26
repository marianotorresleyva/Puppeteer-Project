import { config } from 'dotenv';
import { navigationOverWeb, login, lanceBrowser, navigationInsideCourse } from './utils.js';
config(); // Get Enviorment Variables

(async () => {
    const { browser, page } = await lanceBrowser(process.env.LOGIN_URL)
    await login(page)
    await navigationOverWeb(page)
    await navigationInsideCourse(page)
    await browser.close()
})()
