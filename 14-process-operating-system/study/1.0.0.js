const stream = require("stream");
const util = require("util");
const { StringDecoder } = require("string_decoder");
const pipelineAsync = util.promisify(stream.pipeline);

const transformStream = (() => {
    const decoder = new StringDecoder("utf8");
    return stream.Transform({
        transform(chunk, encoding, callback) {
            try {
                const value = decoder.write(chunk);
                this.push(value.toUpperCase())
                callback(null)
            } catch (error) {
                callback("transform error!\n" + error)
            }
        }
    })
})()

{
    pipelineAsync(
        process.stdin,
        transformStream,
        process.stdout
    ).catch(error => process.stderr.write(error + "\n"))
    .finally(() => process.stdout.write("complete!" + "\n"));

    console.log(
        "isTTY", process.stdin.isTTY
    );
}
