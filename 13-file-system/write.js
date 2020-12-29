const path = require("path");
const fs = require("fs");
const util = require("util")
const filePath = path.resolve(__dirname, "file-1.txt")
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

// Write Append:
{
    writeFileAsync(filePath, `\nTime: ${Date.now()}`, { encoding: "utf8", flag: "a"})
}
