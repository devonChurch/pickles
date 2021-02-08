const stream = require("stream");
const util = require("util")
const pipelineAsync = util.promisify(stream.pipeline);

{
    const items = ["one", "two", "three"];
    const readStream = stream.Readable({
        read(size) {
            setTimeout(() => {
                const item = items.length ? items.shift() : null;
                this.push(item);
            }, 500);
        }
    });

    const writeStream = stream.Writable({
        write(chunk, encoding, callback) {
            console.log(`--> ${chunk}`);
            callback(null, chunk);
        }
    });

    // stream.pipeline(readStream, writeStream, () => console.log("DONE!"))
    
    pipelineAsync(readStream, writeStream)
        .catch(console.error)
        .finally(() => console.log("pipeline | close stream"));


    readStream.on("data", (data) => console.log("read | data", data));
    readStream.on("close", () => console.log("read | closing!"));
    readStream.on("end", () => console.log("read | ending!"));
    readStream.on("error", (error) => console.error("read", error));
    
    
    writeStream.on("finish", () => console.log("write | finish!"))
    writeStream.on("close", () => console.log("write | closing!"));
    writeStream.on("error", (error) => console.error("write", error));

    writeStream.write("potato!");

    // stream.finished(readStream, () => console.log("FINISHED | READ!!!!"));
    
    util.promisify(stream.finished)(readStream)
        .catch(console.error)
        .finally(() => console.log("FINISHED | READ!!!!"));
}