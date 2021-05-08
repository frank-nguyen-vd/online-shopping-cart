const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET_KEY,
  baseURL: 'http://localhost:3000',
  clientID: 'jAEiQ4H5mGaZbuh0dkerpefZgDGemVrR',
  issuerBaseURL: 'https://franknguyenvd.au.auth0.com'
};

module.exports = auth(config);