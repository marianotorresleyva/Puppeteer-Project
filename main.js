const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch({
        executablePath: "/opt/google/chrome/./chrome",
    });
    const page = await browser.newPage();
    await page.goto("https://ed.team/cursos/python");
    await page.screenshot({ path: "image.png" });
    await browser.close();
})();
