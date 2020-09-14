const httpErr = require("./httpErr");

class intErrMsg extends httpErr {
    constructor(detailErr) {
        super(
            "Internal Server Error",
            500,
            detailErr
        );
    }
}

module.exports = intErrMsg;