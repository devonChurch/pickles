const doSomething = (value) => {
    if (value === undefined) {
        process.exitCode = 1;
    }

    return process.exitCode ? process.exit() : value * value;
}

process.on("exit", () => {
    console.log(`exiting with code: ${process.exitCode}`);
})

console.log(doSomething(5));
console.log(doSomething(3));
console.log(doSomething());