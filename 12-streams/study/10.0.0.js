"use strict";

const stream = require("stream");
const util = require("util");
const path = require("path");
const os = require("os");
const fs = require("fs");
const fsp = require("fs").promises;

const pipelineAsync = util.promisify(stream.pipeline);

const createStreamOne = () => {
    const readStream = (() => {
        const readStream = stream.Readable({
            objectMode: true,
            read(size) {}
        });

        new Array(5).fill("").forEach((_, index) => {
            readStream.push(`12-streams.10.0.0-file-${index}.txt`)
        });

        readStream.push(null); // finish read stream

        return readStream;
    })();

    const transformStream = stream.Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            this.push({
                fileName: path.resolve(os.tmpdir(), chunk),
                fileContent: `+ this is the content of ${chunk}.` + "\n"
            });
            callback(null)
        }
    });

    const writeStream = stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            fsp
                .writeFile(chunk.fileName, chunk.fileContent, { encoding: "utf8" })
                .then(() => callback(null));
        }
    })

    return pipelineAsync(
        readStream,
        transformStream,
        writeStream
    )
}

const createStreamTwo = () => {
    console.log("createStreamTwo");
    const readStream = (() => {
        const readStream = stream.Readable({
            objectMode: true,
            read(size) {}
        })
        
        const fileNames = fsp.readdir(os.tmpdir())
            .then(items => items.filter(item => item.startsWith("12-streams.10.0.0")))
            .then(items => Promise.all(
                items.map(item => fsp.readFile(
                    path.resolve(os.tmpdir(), item),
                    { encoding: "utf8" }
                ))
            ))
            .then(items => items.forEach(item => readStream.push(item)))
            .then(() => readStream.push(null))
            .catch(error => console.error(error));

        return readStream;

    })();

    // readStream.on("data", (data) => console.log(data))

    const writeStream = fs.createWriteStream(
        path.resolve(__dirname, "10.0.0.txt"),
        { encoding: "utf8", flag: "a" }
    )

    return pipelineAsync(
        readStream,
        writeStream
    )

}

createStreamOne()
    .then(createStreamTwo)
    .catch(error => console.error(error))
    .finally(() => console.log("sequence complete!"));



