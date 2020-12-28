const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const createFileToRead = () => {
  // Make a giant file...
  const data = Array.from({ length: 5000 }).reduce(
    (acc, _, index) => `${acc}${index + 1}.\n`,
    ""
  );
  // 1.
  // 2.
  // ....
  // 5000.
  return writeFileAsync("./file-1.txt", data);
};

const readFileAsStream = () =>
  new Promise((resolve, reject) => {
    const fileData = [];
    const readStream = fs.createReadStream("./file-1.txt", {
      // Force the stream to get 8kb chunks (to test Buffer.concat())
      highWaterMark: 8 * 1024,
    });
    readStream.on("data", (response) => {
      console.log(response, "\n\n");
      fileData.push(response);
    });
    readStream.on("end", () => {
      resolve(Buffer.concat(fileData).toString("utf8"));
    });
    readStream.on("error", (error) => {
      reject(error);
    });
    readStream.on("close", () => console.log("closed!"))
  });

createFileToRead()
  .then(readFileAsStream)
  .then((data) => console.log("got data\n\n", data))
  .catch(console.error)
  .finally(() => console.log("sequence complete"));
