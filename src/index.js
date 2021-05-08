'use strict';

const express = require('express');
const app = express();

// ! This replaces deprecated body-parser to parses JSON bodies
app.use(express.json());

require('./config/mongoose.js')(app);

require('dotenv').config();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to Shopping Cart API'
    });
});



app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
