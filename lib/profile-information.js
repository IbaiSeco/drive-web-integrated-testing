const puppeteer = require('puppeteer');
const { envSignInURL, envUserAgent, envUsername, envPassword, envDashURL, envServDashURL, envServReqURL, envPostalCode } = require('./config');

(async () => {
    //To launch puppeteer
    const browser = await puppeteer.launch({headless: false, slowMo: 30, defaultViewport: null});
    const page = await browser.newPage();
        
    //To get to login page
    await page.goto(envSignInURL);
    page.setUserAgent(envUserAgent);
        
    //Sign up process, different due to varying sign ins
    //Entering login details into the login form with .env variables
    await page.type('#Username', envUsername);
    await page.type('#passwrd', envPassword);

    //This function allows for the page to load in
    await Promise.all([
        page.waitForResponse(envDashURL),
        page.click('#sign-in-btn')
    ]);

    await page.goto(envServDashURL);
    await Promise.all([
        page.waitForResponse(envServReqURL),
        page.click('#serv-history-book-new-appointment')
    ]);

    await browser.close();
});