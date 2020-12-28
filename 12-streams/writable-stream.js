const fs = require("fs");

{
  const fileData = Array.from({ length: 3 }).map((_, step) => {
    return Array.from({ length: 100 }).reduce(
      (acc, _, increment) => `${acc}${step * 100 + (increment + 1)}.\n`,
      ""
    );
  });

  const writeStream = fs.createWriteStream("./file-2.txt");

  writeStream.on("error", console.error);
  writeStream.on("close", () => console.log("closed!"));
  writeStream.on("finish", () => console.log("finished!"));

  fileData.forEach((data) => {
    console.log(data);
    writeStream.write(data);
  });

  writeStream.end("- - - - - -");
}
