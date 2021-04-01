const util = require("util")

class CannotBeFiveError extends Error {
    constructor() {
        super("value cannot be 5")
        this.name = "CannotBeFiveError";
        this.code = "CANNOT_BE_FIVE";
    }
}

const makeCallbackRequest = (value, callback) => {
    setTimeout(() => {
        let error = null;

        if (!value) {
            error = new Error("value is required")
        } else if (typeof value !== "number") {
            error = new TypeError("value must be a number")
        } else if (value < 0) {
            error = new RangeError("value must be a positive number")
        } else if (value === 5) {
            error = new CannotBeFiveError()
        }

        callback(error, error ? undefined : value * value);
    }, Math.random() * 1000);
}

const makeAsyncRequest = util.promisify(makeCallbackRequest);

module.exports = {
    makeCallbackRequest,
    makeAsyncRequest
}

