"use strict";

const childProcess = require("child_process");
const os = require("os");
const util = require("util");
const stream = require("stream");

const filterOutTheJsFiles = (items) => items.filter(item => item.trim().endsWith(".txt"));

// {
//     try {
//         const response = childProcess.execSync("ls -a", { cwd: os.tmpdir() });
//         console.log(
//             "\n\n\nexecSync:\n",
//             filterOutTheJsFiles(response.toString().trim().split("\n"))
//         )
//     } catch (error) {
//         console.error(error);
//     }
// }

// {
//     childProcess.exec("ls -a", { cwd: os.tmpdir() }, (error, stdout, stderr) => {
//         if (error) {
//             console.error(error);
//         } else {
//             console.log(
//                 "\n\n\nexec:\n",
//                 filterOutTheJsFiles(response.toString().trim().split("\n"))
//             )
//         }
//     })
// }

// {
//     util.promisify(childProcess.exec)("ls -a", { cwd: os.tmpdir() })
//         .then(response => response.stdout.trim().split("\n"))
//         .then(filterOutTheJsFiles)
//         .then(items => console.log(
//             "\n\n\nexec (promise):\n",
//             items
//         ))
//         .catch(error => error);
//         // .finally(() => console.log("complete"));
// }

// {
//     const response = childProcess.spawnSync("ls", ["-a"], { cwd: os.tmpdir() });
//     console.log(
//         "\n\n\nspawnSync:\n",
//         filterOutTheJsFiles(response.stdout.toString().trim().split("\n"))
//     )
// }

// {
//     const { fileList, writeStream } = (() => {

//         let fileList = []

//         const writeStream = stream.Writable({
//             write(chunk, encoding, callback) {
//                 filterOutTheJsFiles(chunk.toString().trim().split("\n")).forEach(item => fileList.push(item))
//                 callback(null);
//             }
//         });

//         return { fileList, writeStream };
//     })()

//     const readStream = childProcess.spawn("ls", ["-a"], { cwd: os.tmpdir() }).stdout;

//     util.promisify(stream.pipeline)(
//         readStream,
//         writeStream
//     ).then(() => console.log(
//         "\n\n\nspawn:\n",
//         fileList
//     ))
//     .catch(error => console.error(error));
// }