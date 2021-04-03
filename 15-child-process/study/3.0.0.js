"use strict"

const childProcess = require("child_process")
const util = require("util");
const path = require("path");
const stream = require("stream");
const execAsync = util.promisify(childProcess.exec);

// (async () => {
//     try {
//         const { stdout } = await execAsync(`ls`, {
//             cwd: path.resolve(__dirname, "../", "../")
//         });
    
//         console.log(JSON.stringify(stdout.split("\n").filter(Boolean), null, 2));
//     } catch (error) {
//         console.error(error);
//     }
// })()

// (async () => {
//         execAsync(`${process.execPath} ${path.resolve(__dirname, "3.1.0.js")}`, {
//             cwd: path.resolve(__dirname, "../", "../")
//         }).then(({ stdout }) => {
//             console.log(JSON.stringify(stdout.split("\n").filter(Boolean), null, 2));
//         }).catch(error => console.error(error));
// })();

// {
//     try {
//         const response = childProcess.execSync(`${process.execPath} ${path.resolve(__dirname, "3.1.0.js")}`, {
//             cwd: path.resolve(__dirname, "../../")
//         })
    
//         console.log(response.toString("utf8"));
//     } catch (error) {
//         console.error(error);
//     }
// }

// {
//     try {
//         const { stdout, stderr } = childProcess.spawnSync(
//             "ls", ["-a"]
//         );

//         console.log({
//             stdout: stdout.toString("utf8"),
//             stderr: stderr.toString("utf8")
//         });

//         console.log(JSON.stringify(
//             stdout.toString("utf8").split("\n").filter(Boolean),
//             null,
//             2
//         ));
//     } catch (error) {
//         console.error(error);
//     }
// }

{
    const spawnStream = childProcess.spawn(process.execPath, [
        path.resolve(__dirname, "3.1.0.js")
    ], {
        cwd: path.resolve(__dirname, "../../")
    });

    const transformStream = stream.Transform({
        transform(chunk, encoding, callback) {
            chunk.toString("utf8").split("\n").filter(Boolean).forEach(item => this.push(item));
            callback(null);
        }
    })

    const { writeStream, fileList } = (() => {
        const fileList = [];

        const writeStream = stream.Writable({
            write(chunk, encoding, callback) {
                fileList.push(
                    chunk.toString("utf8")
                );
                callback(null)
            }
        });

        return { writeStream, fileList };
    })();
    
    stream.finished(writeStream, () => {
        console.log("complete!", fileList);
    })

    spawnStream.stdout
        .pipe(transformStream)
        .pipe(writeStream);

}