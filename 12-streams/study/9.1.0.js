"use strict"

const stream = require("stream");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const os = require("os");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);

const createStreamOne = () => {
    const readStream = (() => {
        const items = new Array(5).fill(0).map((_, index) => `12-streams-9.1.0-${index}.txt`);
        const readStream = new stream.Readable({
            objectMode: true,
            read(size) {}
        });
        items.forEach(item => readStream.push(item));
        readStream.push(null);

        return readStream
    })();
    const transformStream = new stream.Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            console.log("transform", chunk);
            const value = chunk.toString("utf8");
            // this.push(Buffer.from(JSON.stringify({
            this.push({
                fileName: value,
                fileContent: `+ file content for ${value}\n`
            })
            // })))
            callback(null);
        }
    })
    const writeStream = stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            console.log("writing", chunk);
            const { fileName, fileContent} = chunk; // JSON.parse(chunk.toString("utf8"));
            fsp.writeFile(
                path.resolve(os.tmpdir(), fileName),
                fileContent,
                { encoding: "utf8"}
            )
            callback(null);
        }
    });

    return pipelineAsync(
        readStream,
        transformStream,
        writeStream,
    );
}

const createStreamTwo = () => {
    const readStream = (() => {
        const readStream = stream.Readable({
            objectMode: true,
            read(size) {}
        });

        (async () => {
            try {
                const filePaths = await fsp.readdir(os.tmpdir())
                    .then(items => items.filter(item => item.startsWith("12-streams")))

                console.log({filePaths});

                filePaths.forEach((item) => 
                    fsp.readFile(path.resolve(os.tmpdir(), item))
                        .then((data) => readStream.push(data))
                )
            } catch (error) {
                console.error(error)
            }

        })()

        return readStream
    })();
    const writeStream = fs.createWriteStream(
        path.resolve(__dirname, "9.1.0.txt"),
        { flag: "a", encoding: "utf8"}
    )

    return pipelineAsync(
        readStream,
        writeStream
    )
}


createStreamOne()
    .then(() => console.log("one complete"))
    .then(createStreamTwo)
    .then(() => console.log("two complete"))
    .then(() => console.log("done!"))
    .catch(error => console.error(error));


