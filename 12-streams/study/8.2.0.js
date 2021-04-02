const stream = require("stream");

const transformStream = stream.Transform({
    transform(chunk, encoding, callback) {
        this.push(
            chunk.toString("utf8").toUpperCase()
        );

        callback(null)
    }
})


process.stdin.pipe(transformStream).pipe(process.stdout)

console.log("is stdin teltype?", process.stdin.isTTY);
