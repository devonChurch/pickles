const fs = require("fs");
const path = require("path");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const getCurrentTime = () => new Date().toLocaleTimeString();

{
    fs.writeFile(path.resolve(__dirname, "./1.2.0-writeFile.txt"), getCurrentTime(), { encoding: "utf8"}, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("writeFile | complete!");
        }
    });
}

{
    try {
        fs.writeFileSync(path.resolve(__dirname, "./1.2.0-writeFileSync.txt"), getCurrentTime(), { encoding: "utf8" });
        console.log("writeFileSync | complete!");
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    writeFileAsync(path.resolve(__dirname, "./1.2.0-writeFileAsync.txt"), getCurrentTime(), { encoding: "utf8" })
        .then(() => console.log("writeFileAsync | complete"))
        .catch(error => console.error(error))
})();

{
    const addTimeToFile = (tick) => tick
    ? new Promise((resolve) => setTimeout(() => console.log('resolving', tick) || resolve(), 1000))
        .then(writeFileAsync(path.resolve(__dirname, "./1.2.0-append.txt"), `${getCurrentTime()}\n`, { encoding: "utf8", flag: "a"}))
        .then(addTimeToFile(tick - 1))
    : Promise.resolve();

    addTimeToFile(5)
        .catch(error => console.error(error))
        .finally(() => console.log("append | complete!"));
}