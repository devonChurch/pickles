const util = require("util");

class PotatoError extends Error {
    constructor() {
        super("value cannot be potato!")
        this.name = "PotatoError";
        this.code = "NO_POTATO"
    }
}

const doSomething = (something, callback) => {

    let error = null;

    if (!something) {
        error = new Error("must supply a value")
    } else if (typeof something !== "string") {
        error = new TypeError("value must be a string")
    } else if (something.length > 10) {
        error = new RangeError("value cannot be more than 10 characters")
    } else if (something === "potato") {
        error = new PotatoError();
    }

    const timeout = Math.random() * 1000;

    setTimeout(() => {
        if (error) {
            callback(error)
        } else {
            callback(error, `doing some ${something}`)
        }
    }, timeout);
}

const doSomethingAsync = util.promisify(doSomething);

module.exports.doSomething = doSomething;
module.exports.doSomethingAsync = doSomethingAsync;

/*
(async () => {
    doSomething("running", (error, response) => {
        if (error) {
            console.error("callback", error);
        } else {
            console.log("callback", response);
        }
    });
    
    doSomething(undefined, (error, response) => {
        if (error) {
            console.error("callback", error);
        } else {
            console.log("callback", response);
        }
    });

    doSomethingAsync("walking")
        .then((response) => console.log("promise", response))
        .catch((error) => console.error("promise", error))

    doSomethingAsync(42)
        .then((response) => console.log("promise", response))
        .catch((error) => console.error("promise", error))

    try {
        console.log(
            "async/await",
            await doSomethingAsync("jumping")
        );
    } catch (error) {
        console.log("async/await", error);
    }

    try {
        console.log(
            "async/await",
            await doSomethingAsync("potato")
        );
    } catch (error) {
        console.log("async/await", error);
    }
})()
*/