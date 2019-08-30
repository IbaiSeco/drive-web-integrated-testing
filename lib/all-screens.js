const puppeteer = require('puppeteer');
const { envSignInURL, envUserAgent, envUsername, envPassword, envDashURL, envServDashURL, envServReqURL, envPostalCode } = require('./config');

(async () => {
    try {
        //To open up DRIVE sign in page
        const browser = await puppeteer.launch({headless: false, slowMo: 30, defaultViewport: null});
        const page = await browser.newPage()
        await page.goto(envSignInURL)
        page.setUserAgent(envUserAgent);

        //Entering login details into the login form with .env variables
        await page.type('#Username', envUsername)
        await page.type('#passwrd', envPassword)

        await Promise.all([
            page.waitForResponse(envDashURL),
            page.click('#sign-in-btn')
        ])

        await page.waitFor(15000); //Hopefully replaced with a better solution
        await autoScroll(page)

        await page.waitFor(5000); // need to be replaced for page loading

        //await page.waitFor(5000); //needs to be replaced for page loading
        //await autoScroll(page);

        await page.$eval('ul[role="tablist"] a[href="#services"]', elem => elem.click());

        await browser.close();
        } catch (error) {
            console.error(error);
        }
})();
    
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}