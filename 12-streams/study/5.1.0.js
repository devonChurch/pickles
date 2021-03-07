const stream = require("stream");
const { StringDecoder } = require("string_decoder")
const util = require("util");
const finishedAsync = util.promisify(stream.finished);
const pipelineAsync = util.promisify(stream.pipeline);

const readStream = (() => {
    const values = ["one", "two", "three", "four", "five"];

    return stream.Readable({
        objectMode: true,
        read() {
            let interval;
            interval = setInterval(() => {
                if (values.length) {
                    this.push(values.pop())
                } else {
                    console.log("COMPLETE READ!");
                    this.push(null);
                    clearInterval(interval);
                }
            }, 1000)
        }
    });
})();

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
            values.push(chunk);
            callback(null);
        }
    });

    return { values, writeStream };
})();

// {
//     stream.finished(readStream, (error) => {
//         if (error) {
//             console.error(error)
//         } else {
//             console.log("read | complete")
//         }
//     });
    
//     stream.finished(transformStream, (error) => {
//         if (error) {
//             console.error(error)
//         } else {
//             console.log("transform | complete")
//         }
//     });
    
//     stream.finished(writeStream, (error) => {
//         if (error) {
//             console.error(error)
//         } else {
//             console.log("write | complete")
//         }
//     });

//     stream.pipeline(
//         readStream,
//         transformStream,
//         writeStream,
//         () => {
//             values.forEach((value) => {
//                 console.log("pipeline", value.toString());
//             });
//         }
//     );
// }

{
    finishedAsync(readStream)
        .catch(error => console.error(error))
        .finally(() => console.log("read | complete"));
    
    finishedAsync(transformStream)
        .catch(error => console.error(error))
        .finally(() => console.log("transform | complete"));
    
    finishedAsync(writeStream)
        .catch(error => console.error(error))
        .finally(() => console.log("write | complete"));

    pipelineAsync(
        readStream,
        transformStream,
        writeStream,
    ).catch(error => console.error(error))
    .finally(() => {
        console.log("pipeline | complete")
        values.forEach((value) => {
            console.log("pipeline", value.toString());
        });
    });
}