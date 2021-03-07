class UpperCaseError extends Error {
    constructor() {
        super("cannot contain uppercase characters");
        this.name = "UpperCaseError";
        this.code = "NO_UPPERCASE_CHARACTERS";
    }
}

const convertToUpperCase = (text) => {

    if (text === undefined) {
        throw new Error("must supply a value")
    }

    if (typeof(text) !== "string") {
        throw new TypeError("value is not of type string");
    }

    if (text.length < 1) {
        throw new RangeError("string must contain at least one character")
    }

    if (/[A-Z]/.test(text)) {
        throw new UpperCaseError();
    }

    return text.toUpperCase();
}


try {
    // console.log(convertToUpperCase("potato"));
    // console.log(convertToUpperCase());
    // console.log(convertToUpperCase(""));
    // console.log(convertToUpperCase("APPLE"));
} catch(error) {
    console.error(error);
}