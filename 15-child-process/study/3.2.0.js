"use strict"

// Recurse up the file tree (5 times)...

const childProcess = require("child_process");
const path = require("path");
const fsp = require("fs").promises;
const util = require("util");
const execAsync = util.promisify(childProcess.exec);

const { CURRENT_TICK } = process.env;

const runAnotherItteration = () => execAsync(`${process.execPath} ${path.resolve(__dirname, "3.2.0.js")}`, {
    cwd: path.resolve(process.cwd(), "../"),
    env: {
        ...process.env,
        CURRENT_TICK: CURRENT_TICK === undefined ? 5 : Number(CURRENT_TICK) - 1
    },
    stdio: "ignore"
});

const logResponse = (response) => process.stdout.write(
    (typeof response === "string"
    ? response
    : JSON.stringify(response, null, 2))
    + "\n\n\n");

if (Number(CURRENT_TICK) <= 0) {
    process.exit(0)
} else {
    fsp.readdir(process.cwd())
        .then(logResponse)
        .then(runAnotherItteration)
        .then(response => logResponse(response.stdout))
        .catch(error => console.error(error));
}



