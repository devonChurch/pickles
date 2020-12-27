const fs = require("fs");
const util = require("util");
const assert = require("assert");
const readFileAsync = util.promisify(fs.readFile);

const getFileContents = async (filePath) => {
  try {
    const rawData = await readFileAsync(filePath);
    return rawData.toString();
  } catch (error) {
    throw new Error("failed to read");
  }
};

// Should return file content.
(async () => {
  const content = await getFileContents("file-1.txt");
  assert.strictEqual("FILE ONE", content.trim());
})();

// Should throw error "failed to read".
(async () => {
  assert.rejects(() => getFileContents("file-unknown.txt"), /failed to read/)
})();
