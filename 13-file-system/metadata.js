const fs = require("fs");
const path = require("path")
const util = require("util")
const statAsync = util.promisify(fs.stat);
const lstatAsync = util.promisify(fs.lstat);
const filePath = path.resolve(__dirname, "file-1.txt")

// Stat/
{
    statAsync(filePath)
        .then(stat => console.log("stat", stat))
        .catch(console.error)
}

// Lstat.
{
    lstatAsync(filePath)
        .then(lstat => console.log("lstat", lstat))
        .catch(console.error)
}