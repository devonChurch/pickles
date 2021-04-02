const stream = require("stream");
const os = require("os");
const fs = require("fs");
const fsp = require("fs").promises;
const util = require("util")
const path = require("path");
const pipelineAsync = util.promisify(stream.pipeline);

// Stream 1.
// create 100 files in temp directory
// transform them

// Stream 2.
// read files
// write contents into a single file


console.log(
    os.tmpdir()
);

const createStreamOne = () => {
    const readStream = () => {
        const readStream = stream.Readable({
            read(size) {}
        });
    
        new Array(10).fill(0).forEach((_, index) => readStream.push(`${index}`));
        readStream.push(null)
    
        return readStream;
    };
    
    const transformStream = () => stream.Transform({
        transform(chunk, encoding, callback) {
            const index = chunk.toString("utf8");
            console.log("transform", index);
            const payload = Buffer.from(JSON.stringify({
                fileName: path.resolve(os.tmpdir(), `8.0.0-file${index}.txt`),
                fileContent: `+ Item: ${index}`
            }), "utf8");
            this.push(payload);
            callback(null);
        }
    })
    
    const writeStream = () => {
        const writeStream = stream.Writable({
            write(chunk, encoding, callback) {
                const { fileName, fileContent } = JSON.parse(chunk.toString("utf8"));
                fsp.writeFile(
                    fileName,
                    fileContent,
                    { encoding: "utf8" }
                ).then(() => {
                    console.log("write", { fileName, fileContent});
                    callback(null)
                })
                .catch((error) => callback(error))
            }
        })
    
        return writeStream;
    };

    return pipelineAsync(
        readStream(),
        transformStream(),
        writeStream(),
    );
}

const createStreamTwo = (fileNames) => {
    
    const readStream = () => {
        const readStream = stream.Readable({
            read(size) {}
        });

        Promise.all(
            fileNames.map(
                fileName => fsp.readFile(path.resolve(os.tmpdir(), fileName), { encoding: "utf8" })
                .then(fileContent => readStream.push(fileContent))
            )
        ).then(() => readStream.push(null));

        return readStream;
    }

    const writeStream = () => fs.createWriteStream(
        path.resolve(__dirname, "8.0.0-combined.txt"),
        { encoding: "utf8", flags: "a" }
    );

    return pipelineAsync(
        readStream(),
        writeStream()
    );
} 

fsp.unlink(path.resolve(__dirname, "8.0.0-combined.txt"))
    .then(createStreamOne)
    .then(() => fsp.readdir(os.tmpdir()))
    .then(items => items.filter(item => item.startsWith("8.0.0-file")))
    .then(createStreamTwo)
    .then(() => fsp.readFile(path.resolve(__dirname, "8.0.0-combined.txt"), { encoding: "utf8"}))
    .then(console.log)
    .finally(() => {
        console.log("COMPLETE!!!!")
    });