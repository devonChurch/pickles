const stream = require("stream");
const fs = require("fs");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);

const readStream = fs.createReadStream("file-3.txt");
const writeStream = fs.createWriteStream("file-3-uppercase.txt");

const transformStream = new stream.Transform({
  transform(chunk, encoding, callback) {
    console.log({
      chunk,
      encoding,
      callback,
    });

    const message = chunk.toString("utf8").toUpperCase();
    this.push(message);
    callback();
  },
});

// Just for fun... this does nothing!
const passthroughStream = new stream.PassThrough();

pipelineAsync(readStream, passthroughStream, transformStream, writeStream)
  .then(() => console.log("complete!"))
  .catch(console.error);
