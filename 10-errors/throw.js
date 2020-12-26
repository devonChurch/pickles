// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Throw an `Error` object.

const doSomething = (something) => {
    const somethingType = typeof something;''
    if (somethingType !== "string") {
        const errorMessage = `something must be an "string", recieved a ${somethingType}`;
        throw new Error(errorMessage);
    }
    console.log(`doing, ${something}`);
}

doSomething("Node.js study");
doSomething(["Node.js study", "some cleaning"]); // Error, with stack trace

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Throw a simple string

soSomethingElse = () => {
    const somethingType = typeof something;''
    if (somethingType !== "string") {
        const errorMessage = `something must be an "string", recieved a ${somethingType}`;
        throw errorMessage; // Note: no `Error` constructor!!!
    }
    console.log(`doing, ${something}`);
}

soSomethingElse("Node.js study");
soSomethingElse(["Node.js study", "some cleaning"]); // Error, with stack trace