const stream = require("stream");
const { StringDecoder } = require("string_decoder")

const readStream = (() => {
    const values = ["one", "two", "three", "four", "five"];

    return stream.Readable({
        objectMode: true,
        read() {
            let interval;
            setInterval(() => {
                if (values.length) {
                    this.push(values.pop())
                } else {
                    console.log("COMPLETE READ!");
                    this.push(null);
                    clearInterval(interval)
                }
            }, 1000)
        }
    });
})();

readStream.on("data", (data) => console.log({ data }));
readStream.on("end", () => {
    console.log("ending")
});
readStream.on("close", () => console.log("closing"));
readStream.on("error", (error) => console.error(error));

const transformStream = (() => {
    const decoder = new StringDecoder();

    return stream.Transform({
        transform(chunk, encoding, callback) {
            this.push(decoder.write(chunk).toUpperCase())
            callback(null);
        }
    });
    
})()


const { values, writeStream } = (() => {
    const values = [];

    const writeStream = stream.Writable({
        write(chunk, encoding, callback) {
            console.log("write", { chunk });
            values.push(chunk);
            callback(null);
        }
    });

    return { values, writeStream };
})();


readStream.pipe(transformStream).pipe(writeStream);

writeStream.on("error", (error) => console.error(error));
writeStream.on("close", () => console.log("write | closing"))
writeStream.on("finish", () => {
    console.log("write | finished");
    values.forEach((value) => {
        console.log("write", value.toString());
    });
})