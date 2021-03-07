const path = require("path");

console.log({__dirname, __filename});

console.log("cwd", process.cwd());

console.log({
    join1: path.join("foo", "bar", "../baz", "zap.txt"),
    resolve1: path.resolve("foo", "bar", "../baz", "zap.txt"),
    join2: path.join("/", "foo", "bar", "../baz", "zap.txt"),
    resolve2: path.resolve("/", "foo", "bar", "../baz", "zap.txt"),
});


const pathConfig = path.parse(
    path.join("./", "file-1.txt")
);
console.log({
    pathConfig,
    fileName: pathConfig.name,
    fileExtension: pathConfig.ext,
    fullPath: path.format(pathConfig)
});