class CustomError extends Error {
    constructor() {
        super("this is a custom error!!!!")
        this.name = "CustomError"
        this.code = "CUSTOM_ERROR"
    }
}

const doSomething = (value) => {
    if (value === undefined) {
        throw new Error("value is required")
    } else if (typeof value !== "string") {
        throw new TypeError("value must be a string")
    } else if (value.length > 10) {
        throw new RangeError("value must be 10 character of less")
    } else if (value === "") {
        throw new CustomError();
    }

    return value;
}


console.log(doSomething("a very log word to go over the limit"));