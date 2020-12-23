const fs = require("fs");
const path = require("path");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

// Dynamic: read x files (with rejection)...
(async () => {
  // There are only 3 "legitimate" files - the 4th file will throw a rejection.
  const filePaths = Array.from({ length: 4 }).map((_, index) =>
    path.resolve(__dirname, `file-${index + 1}.txt`)
  );

  const fileData = {};

  for (let filePath of filePaths) {
    try {
      const buffer = await readFileAsync(filePath);
      const data = buffer.toString();
      fileData[filePath] = data.trim();
    } catch (error) {
      console.error(error);
    }
  }

  console.log(fileData);

  // Outputs...
  // {
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-1.txt': 'FILE ONE',
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-2.txt': 'FILE TWO',
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-3.txt': 'FILE THREE'
  // }
})();

// Dynamic: read x files (with rejection)...
(async () => {
  // There are only 3 "legitimate" files - the 4th file will throw a rejection.
  const filePaths = Array.from({ length: 4 }).map((_, index) =>
    path.resolve(__dirname, `file-${index + 1}.txt`)
  );

  const getFileData = async (filePath) => {
    const buffer = await readFileAsync(filePath);
    return buffer?.toString()?.trim();
  };

  console.log("filePaths.map(getFileData)", filePaths.map(getFileData));

  const fileData = await Promise.allSettled(filePaths.map(getFileData))
    .then((responses) =>
      responses.filter(
        ({ status }) => console.log(status) || status === "fulfilled"
      )
    )
    .catch(console.error)
    .finally(() => console.log("Complete!"));

  console.log("fileData", fileData);

  // Outputs...
  // {
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-1.txt': 'FILE ONE',
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-2.txt': 'FILE TWO',
  //   '/Users/devonchurch/Documents/pickles/08-asynchronous-patterns/file-3.txt': 'FILE THREE'
  // }
})();
