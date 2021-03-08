const path = require("path");
const fs = require("fs");
const util = require("util");
const { StringDecoder } = require("string_decoder")
const filePath = path.resolve("./file-1.txt");

{
    fs.readFile(filePath, { encoding: "utf8"}, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            // console.log("readFile", response.toString("utf8"));
            console.log("readFile", new StringDecoder("utf8").write(response));
        }
    });
}

{
    try {
        const response = fs.readFileSync(filePath, {encoding: "utf8"});
        console.log("readFileSync", response.toString("utf8"));
    } catch(error) {
        console.error(error);
    }
}

(async () => {
    readFileAsync = util.promisify(fs.readFile);
    const fileData = await readFileAsync(filePath, { encoding: "utf8"})
        .then(response => response.toString("utf8"))
        .catch(error => console.error(error));
    console.log("readFileAsync", fileData);
})()