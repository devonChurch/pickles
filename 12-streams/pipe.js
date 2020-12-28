const fs = require("fs");
const util = require("util");
const stream = require("stream");
const pipelineAsync = util.promisify(stream.pipeline);

const fileChunks = [];
const readStream = fs.createReadStream("./file-3.txt", {
  highWaterMark: 8 * 1024,
});

const writeStream = fs.createWriteStream("./file-4.txt");

// setTimeout(() => {
//     // readStream.push(null);
//     readStream.
// }, 1000)
// readStream.on("data", console.log)
// readStream.on("end", () => console.log("finished!"))

// Standard "single" pipeline:
// - - - - - - - - - - - - - -

// readStream.pipe(writeStream)

// stream.finished(readStream, (error) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(Buffer.concat(fileChunks).toString());
//   }
// });

// "Multiple" pipelines:
// - - - - - - - - - - -

// stream.pipeline(readStream, writeStream, (error) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log("completed!")
//     }
// })

pipelineAsync(readStream, writeStream)
  .then(() => console.log("success!"))
  .catch(console.error)
  .finally(() => console.log("complete!"));

// (async () => {
//   try {
//     await pipelineAsync(readStream, writeStream);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log("complete!");
// })();
