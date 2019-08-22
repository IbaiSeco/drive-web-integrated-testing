# drive-web-integrated-testing

Automated web testing for www.drive.ca test environments

## How it works

This script uses the `npm puppeteer` package running a headless chrome plugin to test certain aspects of the DRIVE website.

In order for the script to run properly you need to update the `.env` file with the proper information. Then the script will do the rest on its own.

## How to run it

Create a `.env` file in the code directory with the following format, just fill in the details:

```
#stg or dev sign in page
SIGN_IN_URL=''

#To make sure that headless chrome browser functions properly as a verified user and not a robot
#To get this just type, 'what is my user agent' in chrome
USER_AGENT=''

#Enter the account login credentials for the desired test drive account with a vehicle
USERNAME=''
PASSWORD=''

#URL for stg or dev dashboard
DASH_URL=''

#URL for stg or dev servicing dashboard
SERV_DASH=''

#URL for stg or dev service request main page
SERV_FLOW=''

#Testing postal code
POSTAL_CODE=''
```

Once all of these details are inserted, run the following commands:
- `npm install` to install of the necessary dependencies
- Then run `cd lib`
- `node login-serviceflow`

And then the code should run properly and display the correct test results.
