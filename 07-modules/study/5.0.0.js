{
    console.log("internal | fs", require.resolve("fs"))
    console.log("node module | arg", require.resolve("arg"))
    console.log("external | this file", require.resolve(__filename));
}

hasBeenImportedByAnotherModule = require.main !== module;
console.log("hasBeenImportedByAnotherModule", hasBeenImportedByAnotherModule);

const doSomething = (args) => {

    return hasBeenImportedByAnotherModule ? (() => {
        console.log("module args", args)
    })() : (() => {
        console.log("cli args", process.argv.slice(2).reduce((acc, arg) => {
            const [key, value] = arg.split("=");
            return {
                ...acc,
                [key.replace("--", "")]: value
            }
        }, {}));
    })();
}

if (hasBeenImportedByAnotherModule) {
    module.exports = doSomething;
} else {
    doSomething();
}
