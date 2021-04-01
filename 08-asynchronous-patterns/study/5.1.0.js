const fsp = require("fs").promises;
const path = require("path");

const file1 = path.resolve(__dirname, "../", "file-1.txt");
const file2 = path.format({...path.parse(file1), base: 'file-2.txt' });
const file3 = path.format({...path.parse(file1), base: 'file-3.txt' });

console.log({
    file1,
    file2,
    file3,
});

Promise.all([
    fsp.readFile(file1, { encoding: "utf8" }),
    fsp.readFile(file2, { encoding: "utf8" }),
    fsp.readFile(file3, { encoding: "utf8" })
])
    .then((items) => console.log("Promise.all | ", items))
    .catch(error => process.stderr.write("Promise.all | " + error + "\n"))
    .finally(() => console.log("Promise.all | done!"))

Promise.race([
    fsp.readFile(file1, { encoding: "utf8" }),
    fsp.readFile(file2, { encoding: "utf8" }),
    fsp.readFile(file3, { encoding: "utf8" })
])
    .then((item) => console.log("Promise.race | ", item))
    .catch(error => process.stderr.write("Promise.race | " + error + "\n"))
    .finally(() => console.log("Promise.race | done!"))

Promise.allSettled([
    fsp.readFile(file1, { encoding: "utf8" }),
    fsp.readFile(file2, { encoding: "utf8" }),
    fsp.readFile(file3, { encoding: "utf8" })
])
    .then(
        (items) => console.log(
            "Promise.allSettled | ",
            items
                .filter(({ status }) => status === "fulfilled")
                .map(({ value}) => value)
            )
        )
    .catch(error => process.stderr.write("Promise.allSettled | " + error + "\n"))
    .finally(() => console.log("Promise.allSettled | done!"))
    