'use strict';

const express = require('express');
const app = express();
const { requiresAuth } = require('express-openid-connect');

// ! This replaces deprecated body-parser to parses JSON bodies
app.use(express.json());

require('./config/mongoose.js')(app);

require('dotenv').config();
const port = process.env.PORT || 3000;

const auth0 = require('./config/auth0');
app.use(auth0);

app.get('/', (req, res) => {
    if (req.oidc.isAuthenticated()) {
        res.json({ success: true, message: 'Logged In' });
    } else {
        res.json({ success: true, message: 'Logged Out' });
    }
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

require('./resources/router')(app);

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
