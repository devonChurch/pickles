const stream = require("stream");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);


const readStream = process.stdin;
const transformStream = stream.Transform({
    transform(chunk, encoding, callback) {
        this.push(
            chunk.toString("utf8").toUpperCase()
        );
        callback(null)
    }
});
const writeStream = process.stdout;

pipelineAsync(
    readStream,
    transformStream,
    writeStream,
)
.then(() => console.log("complete"))
.catch(error => console.error(error));

process.stdin.push("potato")