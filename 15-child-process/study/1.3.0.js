const childProcess = require("child_process");
const fs = require("fs");
const util = require("util");

{
    const isChildProcess = process.env.IS_CHILD;
    process.stdout.write("isChildProcess: " + isChildProcess + "\n");
    process.stdout.write("cwd: " + process.cwd() + "\n");

    if (!isChildProcess) {
    // if (true) {
        const exec = childProcess.execSync(
            `${process.execPath} ${__filename}`,
            {
                env: { "IS_CHILD": true },
                cwd: __dirname,
                // stdio: "inherit"
                stdio: [process.stdin, process.stdout, process.stderr]
            });
        const dirs = fs.readdirSync(process.cwd(), { encoding: "utf8"});
        process.stdout.write("dirs:" + dirs + "\n")
    }
}