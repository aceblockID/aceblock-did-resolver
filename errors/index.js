const logger = require("../logging");

const httpErr = require("./httpErr");
const badReqErr = require("./badReqErr");
const intErr = require("./intErr");
const notFoundErr = require("./notFoundErr");
const intErrMsg = require("./intErrMsg");

function handleErr(_error, req, res, next) {
    let error;
    if (_error.name === "HTTPError") {
        error = _error;
    } else {
        error = new intErr(_error.message);
        error.stack = _error.stack;
        if (_error.response) logger.error(_error.response.data);
    }

    if (error.status >= 500) {
        logger.error(error.detail);
    }

    logger.info(`Error ${error.status}: ${error.detail}`);
    res.setHeader("Content-Type", "application/problem+json");
    res.status(error.status);
    res.send(error.jsonString());

    next();
}

module.exports = {
    handleErr,
    httpErr,
    badReqErr,
    intErr,
    notFoundErr,
    intErrMsg,
}