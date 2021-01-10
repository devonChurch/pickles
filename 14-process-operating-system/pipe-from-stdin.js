const stream = require("stream");
const buffer = require("buffer");

// node -p "Math.sqrt(Math.random())" | node pipe-from-stdin.js > letters.txt
// {
//     process.stdin.pipe(process.stdout);
// }

{
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numToCharStream = new stream.Transform({
        transform(chunk, encoding, next) {
            const letters = chunk.toString("utf8").split("").map(index => alphabet[index]).join("");
            next(null, letters);
        }
    });

    // Note: process.std* are unreliable in stream.pipeline (they ever finish or exit) 
    // so use .pipe instead.
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // stream.pipeline(process.stdin, numToCharStream, process.stdout, (error) => {
    //     if (error) { console.error(error) }
    // });

    process.stdin.pipe(numToCharStream).pipe(process.stdout);
}
