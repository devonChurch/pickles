"use strict"

const os = require("os");

const logCwd = () => process.stdout.write(JSON.stringify({
    cwd: process.cwd(),
    pwd: process.env.PWD
}, null, 2));


logCwd();

process.chdir(
    os.tmpdir()
)

logCwd();

