const httpErr = require("./httpErr");

class notFoundErr extends httpErr {
    constructor(detail) {
        super("Not Found", 404, detail);
    }
}

module.exports = notFoundErr;