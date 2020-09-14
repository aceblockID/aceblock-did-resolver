const httpErr = require("./httpErr");

class badReqErr extends httpErr {
    constructor(detail) {
        super("Bad Request", 400, detail);
    }
}

module.exports = badReqErr;