const stream = require("stream");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const { StringDecoder } = require("string_decoder");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);

const createFileNameFromKey = (key) => `7.0.0-${key}.txt`;

const extractKeyFromFilename = (filename) => filename.match(/.*-(?<key>[\w]*)\.txt/).groups.key;

const createPipelineOne = () => {
    const readStream = fs.createReadStream(
        path.resolve(__dirname, createFileNameFromKey("original"))
    );
    
    const transformStream = (() => {
        const decoder = new StringDecoder("utf8");
    
        return new stream.Transform({
            objectMode: true,
            transform(chunk, encoding, callback) {
                const items = decoder.write(chunk).split("\n").filter(Boolean).map(item => item.split(","));
                items.forEach(([title, content]) => {
                    this.push({ title, content })
                });
                callback(null);
            }
        });
    })()
    
    const writeStream = new stream.Writable({
        objectMode: true,
        write(chunk, encoding, callback) {
            const { title, content } = chunk;
            fs.writeFile(
                path.resolve(__dirname, createFileNameFromKey(title)),
                content,
                { encoding: "utf8" },
                callback
            )
        }
    });

    return pipelineAsync(
        readStream,
        transformStream,
        writeStream,
    );
};

const createPipelineTwo = async () => {

    await fsp.unlink(
        path.resolve(__dirname, createFileNameFromKey("reverted"))
    )

    const files = await fsp.readdir(
        path.resolve(__dirname)
    ).then((items) => items.filter(item => (
        item.startsWith("7.0.0") &&
        item.endsWith(".txt") &&
        !item.includes("original") &&
        !item.includes("reverted")
    )))

    console.log(files);

    const readStream = stream.Readable({
        objectMode: true,
        read(size) {}
    });

    files.forEach(file => 
        fsp.readFile(
            path.resolve(__dirname, file),
            { encoding: "utf8" })
            .then(content => readStream.push({
                title: extractKeyFromFilename(file),
                content,
            }))
    );

    const transformStream = stream.Transform({
        objectMode: true,
        transform(chunk, endcoding, callback) {
            const { title, content } = chunk;
            this.push(`${title},${content}\n`)
            callback(null)
        }
    });

    const writeStream = fs.createWriteStream(
        path.resolve(__dirname, createFileNameFromKey("reverted")),
        {
            encoding: "utf8",
            flags: "a"
        }
    )

    return pipelineAsync(
        readStream,
        transformStream,
        writeStream,
    )
}

createPipelineOne()
    .then(createPipelineTwo)
    .catch((error) => console.error(error))
    .finally(() => console.log("complete!!!"))