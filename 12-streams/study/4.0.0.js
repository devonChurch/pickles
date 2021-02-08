const stream = require("stream");
const util = require("util");
const { StringDecoder } = require("string_decoder")
const finishedAsync = util.promisify(stream.finished);
const pipelineAsync = util.promisify(stream.pipeline);

(async () => {
    const readStream = stream.Readable({
        read() {}
    });

    // readStream.on("data", (data) => console.log("read | data", data));

    const transformStream = (() => {
        const decoder = new StringDecoder("utf8");

        return stream.Transform({
            transform(chunk, encoding, callback) {
                const value = decoder.write(chunk);
                this.push("\n" + value + " -->");
                callback();
            }
        });
    })();

    const { writeStream, getFinalCompiledBuffer } = (() => {

        let compiledBuffer = Buffer.alloc(0);

        const writeStream = stream.Writable({
            write(chunk, encoding, callback) {
                compiledBuffer = Buffer.concat([compiledBuffer, chunk]);
                callback();
            }
        });

        function getFinalCompiledBuffer() {
            return compiledBuffer.toString();
        }

        return { writeStream, getFinalCompiledBuffer };
    })();

    finishedAsync(readStream)
        .catch(error => console.error("read | error", error))
        .finally(() => console.log("finished"));

    readStream.push("one");
    readStream.push("two");
    readStream.push("three");
    readStream.push("four");
    readStream.push("five");
    readStream.push("six");
    readStream.push("seven");
    readStream.push(null);

    // readStream.emit("data", Buffer.from("three"));

    pipelineAsync(
        readStream,
        transformStream,
        writeStream // process.stdout
    ).catch(error => console.error("pipeline | error", error))
    .finally(() => console.log("pipeline | complete!", getFinalCompiledBuffer()));

})()