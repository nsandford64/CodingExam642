//Copyright 2022 under MIT License
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//sets up the app to process requests to the /lti endpoint
const ltiRouter = require('./routes/lti');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/lti', ltiRouter);

module.exports = app;