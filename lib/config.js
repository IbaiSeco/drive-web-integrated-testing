const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    envSignInURL: process.env.SIGN_IN_URL,
    envUserAgent: process.env.USER_AGENT,
    envUsername: process.env.USERNAME,
    envPassword: process.env.PASSWORD,
    envDashURL: process.env.DASH_URL,
    envServDashURL: process.env.SERV_DASH,
    envServReqURL: process.env.SERV_FLOW,
    envPostalCode: process.env.POSTAL_CODE,
}
