const stream = require("stream");
const util = require("util")
const pipelineAsync = util.promisify(stream.pipeline)

// Read stream:
// - - - - - - -

const readStream = (() => {
  const chunks = Array.from({ length: 5 }).map((_, index) => `item-${index}`);

  return new stream.Readable({
    read(size) {
      const chunk = chunks.length ? chunks.shift() : null;
      console.log({ stream: "read", size, chunk });
      this.push(chunk);
    },
  });
})();

// Write stream:
// - - - - - - -

const writeStream = (() => {
  return new stream.Writable({
    write(chunk, encoding, callback) {
      console.log({ stream: "write", chunk, encoding, callback });
      callback();
    },
  });
})();

pipelineAsync(readStream, writeStream)
    .then(() => console.log("complete!"))
    .catch(console.error);
