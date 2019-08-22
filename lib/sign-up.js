const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({headless: false, slowMo: 30, defaultViewport: null});
        const page = await browser.newPage()
        await page.goto() //env here
        
        //Sign up process, different due to varying sign ins

    } catch (error) {
        console.error(error);
    }
})