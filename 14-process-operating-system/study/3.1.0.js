const os = require("os");

console.log(process.cwd());
console.log(process.env.PWD);

process.chdir(os.tmpdir());

console.log(process.cwd());
console.log(process.env.PWD);