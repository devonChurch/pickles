// stream events
// stream finished
// stream process.stdio

const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const stream = require("stream");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);

const FILE_NAME = path.resolve(__dirname, "8.1.0.txt");

( async () => {
    try {
        await fsp.writeFile(
            FILE_NAME,
            Date().toLocaleString() + "\n",
            { encoding: "utf8", flag: "a" }
        );
    } catch (error) {
        console.error(error);
    }
})().then(() => {

    const readStream = fs.createReadStream(
        FILE_NAME,
        { encoding: "utf8" }
    );

    readStream.on("data", data => console.log("read", data));
    readStream.on("error", error => console.error("read", error));
    stream.finished(readStream, () => console.log("read finished!"));

    const transformStream = stream.Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            chunk.split("\n").filter(item => Boolean(item.trim())).map(item => this.push(item + "\n"))
            callback(null)
        }
    });

    stream.finished(transformStream, () => console.log("transform finished!"));

    const writeStream = fs.createWriteStream(
        path.format({
            ...path.parse(FILE_NAME),
            base: "8.1.0-stream.txt"
        }),
        { encoding: "utf8", flags: "a" }
    );

    writeStream.on("error", () => console.error(error));
    stream.finished(writeStream, () => console.log("write finished!"));

    return pipelineAsync(
        readStream,
        transformStream,
        writeStream
    );

}).catch(error => console.error(error))
.finally(() => console.log("complete!!!"));