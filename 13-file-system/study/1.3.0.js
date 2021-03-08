const fs = require("fs");
const path = require("path");
const util = require("util");
const mkdirAsync = util.promisify(fs.mkdir);
const rmdirAsync = util.promisify(fs.rmdir);
const unlinkAsync = util.promisify(fs.unlink);
const writeFileAsync = util.promisify(fs.writeFile);

{
    const file1 = "./1-3-0/foo.txt";
    const file2 = "./1-3-0/bar/baz.txt";
    
    mkdirAsync("./1-3-0/bar", { recursive: true })
        .then(() => Promise.all([
            file1,
            file2
        ].map(file => writeFileAsync(file, "this will be deleted!", { encoding: "utf8" }))))
        .then(() => unlinkAsync(file1))
        .then(() => rmdirAsync("./1-3-0", { recursive: true }))
        .catch(error => console.error(error))
        .finally(() => console.log("created and deleted =)"));
}
