const util = require("util");

class UpperCaseError extends Error {
    constructor() {
        super("cannot contain uppercase characters");
        this.name = "UpperCaseError";
        this.code = "NO_UPPERCASE_CHARACTERS";
    }
}

const convertToUpperCase = (text, callback) => {
    setTimeout(() => {
        let error;
        let response;

        if (text === undefined) {
            error = new Error("must supply a value")
        } else if (typeof(text) !== "string") {
            error = new TypeError("value is not of type string");
        } else if (text.length < 1) {
            error = new RangeError("string must contain at least one character")
        } else if (/[A-Z]/.test(text)) {
            error = new UpperCaseError();
        } else {
            response = text.toUpperCase()
        }

        callback(error, response);
    }, Math.random() * 1000)
}

const convertToUpperCaseAsync = util.promisify(convertToUpperCase);

{
    // Callback.

    convertToUpperCase(
        "potato"
        // undefined // ... nothing
        // ""
        // "Apple"
        , (error, response) => {
            if (error) {
                console.error("callback", error);
            } else {
                console.log("callback", response);
            }
        }
    )
}

( async () => {
    try {
        const response = await convertToUpperCaseAsync( 
            "potato"
            // undefined // ... nothing
            // ""
            // "Apple"
        );
        console.log("async/await + try/catch", response);
    } catch (error) {
        console.error("async/await + try/catch", error);
    }
})();

( async () => {
    await convertToUpperCaseAsync( 
        "potato"
        // undefined // ... nothing
        // ""
        // "Apple"
    ).then((response) => console.log("async/await + promise chaining", response))
    .catch((error) => console.error("async/await + promise chaining", error));
})();

{
    convertToUpperCaseAsync( 
        "potato"
        // undefined // ... nothing
        // ""
        // "Apple"
    ).then((response) => console.log("promise", response))
    .catch((error) => console.error("promise", error));
}
