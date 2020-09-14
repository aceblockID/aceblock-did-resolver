const express = require('express');
const app = express();
const config = require('./config/config.js');
const logger = require('./logging');
const errorHandling = require("./errors");

const didDocsRoutes = require('./api/routes/didDocs');
const didAddressesRoutes = require('./api/routes/didAddresses');

const route = config.app.route;


// Handling access and preventing CORS errors
// TODO - elaborate about CORS usage - define uscases and make decision
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST');
        return res.status(200).json({});
    }

    next();
});

// Activating logger
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
})

// Creating routes
app.use(route, didDocsRoutes);
app.use(route, didAddressesRoutes);

// Error handling
app.use((req, res, next) => {
    next(
        new errorHandling.badReqErr(`Invalid service '${req.method} ${req.url}'`)
    );
});
// Error handling
app.use(errorHandling.handleErr);



module.exports = app;