//Copyright 2022 under MIT License
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, "../../client/build")));

//sets up the app to process requests to the /lti endpoint
const ltiRouter = require('./routes/lti');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ltiRouter);

module.exports = app;