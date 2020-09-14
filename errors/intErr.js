const httpErr = require("./httpErr");

class intErr extends httpErr {
    constructor(detailErr) {
        super(
            "Internal Server Error",
            500,
            "The server encountered an internal error and was unable to complete your request"
        );
        // error for logger, not sent to user
        this.detailErr = detailErr;
    }
}

module.exports = intErr;