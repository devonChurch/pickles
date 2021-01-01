const stream = require("stream");
const fs = require("fs");
const path = require("path");
const util = require("util");
const { StringDecoder } = require("string_decoder");
const pipelineAsync = util.promisify(stream.pipeline);

const fileSrc = path.resolve(__dirname, "file-1.txt");
const fileDist = path.resolve(__dirname, "file-1-uppercase.txt");

const readStream = fs.createReadStream(fileSrc, { encoding: "utf8" });
const writeStream = fs.createWriteStream(fileDist, { encoding: "utf8" });

// Do NOT use arrow functions as we cannot inherit .call(this) lol.
function createStringDecoder() {
  return (
    this.stringDecoder ||
    (() => {
      this.stringDecoder = new StringDecoder("utf8");
      return this.stringDecoder;
    })()
  );
}

const transformStream = stream.Transform({
  transform(chunk, encoding, callback) {
    const stringDecoder = createStringDecoder.call(this);
    const decoded = stringDecoder.write(chunk);

    callback(
        null, // error
        decoded.toUpperCase() // content
    );
  },
});

pipelineAsync(readStream, transformStream, writeStream)
  .then(() => console.log("complete!"))
  .catch(console.error);
