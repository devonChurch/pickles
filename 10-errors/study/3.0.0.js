class DuplicateKeysError extends Error {
    constructor() {
        super("cannot replace an existing entry");
        this.name = "DuplicateKeysError"
        this.code = "DUPLICATE_KEY"
    }
}

const addItemToDictionary = (() => {
    const dictionary = {};

    return (key, value) => {

        if (typeof key !== "string") {
            throw new TypeError("key MUST be a string");
        }

        if (value === undefined) {
            throw new Error("value MUST be supplied")
        }

        if (Object.keys(dictionary).length >= 3) {
            throw new RangeError("dictionary can ONLY hold 3 items")
        }

        if (dictionary.hasOwnProperty(key)) {
            throw new DuplicateKeysError();
        }

        dictionary[key] = value;

        console.log("\nupdated!", {...dictionary});
    }
})();

addItemToDictionary("apples", "Granny Smith");
addItemToDictionary("bananas", "Yellow bunch of five");
addItemToDictionary("grapes", "A purple bunch");
// addItemToDictionary("grapes");
// addItemToDictionary("grapes", "A green bunch");
addItemToDictionary("mellon", "Cut in 1/2");