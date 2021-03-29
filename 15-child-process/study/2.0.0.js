const childProcess = require("child_process");
const stream = require("stream");
const util = require("util");
const fs = require("fs");
const path = require("path");
const pipelineAsync = util.promisify(stream.pipeline);

const spawnStream = childProcess.spawn("ls", ["-a"], {
    cwd: path.join(process.env.PWD, "study")
});

const transformStream = new stream.Transform({
    transform(chunk, encoding, callback) {
        const list = chunk.toString().split("\n").filter(item => item.endsWith(".js")).join("\n");
        console.log("transform", list);
        this.push(Buffer.from(list));
        callback(null);
    }
});

const writeStream = fs.createWriteStream(
    path.resolve(__dirname, "2.0.0.output.txt"),
    { flags: "a", encoding: "utf8" }
)

pipelineAsync(
    spawnStream.stdout,
    transformStream,
    writeStream
)
    .catch((error) => process.stderr.write(error))
    .finally(() => process.stdout.write("complete!\n"))