const path = require("path");
const fs = require("fs");
const util = require("util");
const stream = require("stream");
const readFileAsync = util.promisify(fs.readFile);
const filePath = path.resolve(__dirname, "file-1.txt");

// Sync:
{
  try {
    const fileData = fs.readFileSync(filePath, { encoding: "utf8" });
    console.log("sync", fileData);
  } catch (error) {
    console.error(error);
  }
}

// Callback:
{
  fs.readFile(filePath, { encoding: "utf8" }, (error, fileData) => {
    if (error) {
      console.error(error);
    } else {
      console.log("callback", fileData);
    }
  });
}

// Promise:
{
  readFileAsync(filePath, { encoding: "utf8" })
    .then((fileData) => console.log("promise", fileData))
    .catch(console.error);
}

// Async / Await:
(async () => {
  try {
    const fileData = await readFileAsync(filePath, { encoding: "utf8" });
    console.log("async/await", fileData);
  } catch (error) {
    console.error(error);
  }
})();

// Stream:
{
  const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readStream.push("stream start...");
  readStream.on("data", (data) => console.log(data));

  stream.finished(readStream, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log("...stream complete!");
    }
  });
}
