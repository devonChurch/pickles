const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

// Dynamic: read x files...
{
  const filePaths = Array.from({ length: 3 }).map((_, index) =>
    path.resolve(__dirname, `file-${index + 1}.txt`)
  );

  const requests = filePaths.map((filePath) => readFileAsync(filePath));

  const reduceFileDataIntoDict = (fileData) =>
    fileData.reduce(
      (acc, data, index) => ({ ...acc, [filePaths[index]]: data.trim() }),
      {}
    );

  Promise.all(requests)
    .then((fileBuffer) => fileBuffer.map((buffer) => buffer.toString()))
    .then(reduceFileDataIntoDict)
    .then(console.log)
    .catch(console.error)
    .finally(() => console.log("Complete!"));

  // Outputs....
  // {
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-1.txt': 'FILE ONE',
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-2.txt': 'FILE TWO',
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-3.txt': 'FILE THREE'
  // }
}

// Dynamic: read x files (with rejection)...
{
  // There are only 3 "legitimate" files - the 4th file will throw a rejection.
  const filePaths = Array.from({ length: 4 }).map((_, index) =>
    path.resolve(__dirname, `file-${index + 1}.txt`)
  );

  const requests = filePaths.map((filePath) => readFileAsync(filePath));

  const reduceFileDataIntoDict = (fileData) =>
    fileData.reduce(
      (acc, data, index) => ({ ...acc, [filePaths[index]]: data.trim() }),
      {}
    );

  Promise.allSettled(requests)
    .then((responses) =>
      responses.filter(({ status }) => status === "fulfilled")
    )
    .then((fileBuffer) => fileBuffer.map((buffer) => buffer.toString()))
    .then(reduceFileDataIntoDict)
    .then(console.log)
    .catch(console.error)
    .finally(() => console.log("Complete!"));

  // Outputs....
  // {
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-1.txt': 'FILE ONE',
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-2.txt': 'FILE TWO',
  //     '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-3.txt': 'FILE THREE'
  // }
}
