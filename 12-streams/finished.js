const stream = require("stream");
const fs = require("fs");
const { finished } = require("stream");

const readFileFromDisk = () => {
  console.log("starting read stream");

  const readDataItems = [];
  const readStream = fs.createReadStream("./file-3.txt", {
    highWaterMark: 1 * 1024,
  });

  readStream.on("data", (response) => {
    readDataItems.push(response);
  });

  finished(readStream, (error) => {
    if (error) {
      console.error("read stream error!", error);
    } else {
      console.log("complete!", Buffer.concat(readDataItems).toString("utf8"));
    }
  });
};

const writeFileToDisk = () => {
  console.log("starting write stream");

  const writeDataItems = ["one", ", two", ", three."];
  const writeStream = fs.createWriteStream("./file-3.txt", { encoding: "utf8" });

  writeDataItems.forEach((dataItem) => {
    writeStream.write(dataItem);
  });
  writeStream.end();

  stream.finished(writeStream, (error) => {
    if (error) {
      console.error("write stream error!", error);
    } else {
      readFileFromDisk();
    }
  });
};

writeFileToDisk();