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

        await page.goto(envServDashURL)
        await Promise.all([
            page.waitForResponse(envServReqURL),
            page.click('#serv-history-book-new-appointment')
        ])
    
        await page.waitForSelector('#map-query'); //This is the solution for waitFor functions

        // To remove the default postal code if already present
        const input = await page.$('#map-query');
        await input.click({ clickCount: 3 })
        await input.type(envPostalCode);
        await page.click('#req-button');
    
        // Show and seelct dealerships by postal code
        await page.waitForSelector('#showSearchDealers'); // Needs to be replaced with something more accurate than this 
        await page.$eval('#showSearchDealers', elem => elem.click())
        await page.waitFor(10000); // Needs to be replaced with something more accurate than this
        await page.$eval('.prefered-dealer-slider .dealer-info:first-child', elem => elem.click())
        await page.$eval('.text-right .continue-btn:first-child', elem => elem.click());

        // Select different services
        await page.type('#search_srv', 'Oth', {delay: 5});
        await page.waitFor(5000); //Needs to be replaced with something more accurate
        await page.click('#search-other');
        //await page.click('#poplr-376');
        await page.waitFor(2000);
        await page.type('#serv-comments', 'I prefer to put in the best oil for my car, I am very particular');

        const input2 = await page.$('#serv-km');
        await input2.click({ clickCount: 3 })
        await input2.type('36000');
        await page.waitFor(5000);

        // Selecting continue button for dates
        await page.$eval('.choose-service .continue-btn', elem => elem.click());
        await page.waitFor(7000);
    
        //Choosing dates
        await page.$eval('.datepicker .day:not(.disabled)', elem => elem.click());
        await page.waitFor(5000);
        await page.$eval('.timepicker .col-md-6:first-child .btn-primary', elem => elem.click());
        await page.waitFor(5000);
        await page.$eval('.calendar-secondary .datepicker .day:not(.disabled)', elem => elem.click());
        await page.waitFor(4000);
        await page.$eval('.timepicker-secondary .col-md-6:last-child .btn-primary', elem => elem.click());
        await page.waitFor(5000);
        await page.$eval('.select-date-time .continue-btn', elem => elem.click());
        await page.waitFor(4000);

        //Personal Details Selection
        await page.$eval('.checkbox .isShuttleNeeded', elem => elem.click());
        await page.waitFor(3000);
        await page.type('#dropoffAddress', '3 Nesbitt Drive');
        
        await page.$eval('.personal-details .send-request-btn', elem => elem.click());
        
        await page.waitFor(5000);

        //These calls check to make sure that the dashboard loads with the most recent service booking
        await page.goto(envDashURL);
        await page.waitFor(2000);
        await autoScroll(page)

        await page.waitFor(5000);

        //This call goes to the documents page and scrolls down to make sure all information is present
        await page.goto('https://www.stg.drive-ci.com/documents/'); //env needed here
        await page.waitFor(5000);

        //This call goes to the car value page to see if this function is working properly
        await page.goto('https://www.stg.drive-ci.com/en/car-value');
        await page.waitFor(5000);
        await autoScroll(page);

        await page.waitFor(5000);

        //await page.click('#showSearchDealers');
        //page.click('#079a6387-d0a5-2340-9490-a5112be73625');
        //jQuery('.dealer-info:first-child').get(0);
        //jQuery('.search-dealers-slider .dealer-info:first-child');
        //jQuery('.calendar-primary .tr:first-child .day:not(.disabled):first-child');
        //jQuery('.timepickerPrimary .btn-primary');

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
    