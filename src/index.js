'use strict';

const express = require('express');
const app = express();

// ! This replaces deprecated body-parser to parses JSON bodies
app.use(express.json());

require('dotenv').config();

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Shopping Cart API'
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
