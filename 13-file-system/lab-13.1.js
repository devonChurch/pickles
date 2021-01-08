const fs = require("fs");
const path = require("path");
const util = require("util");
const readdirAsync = util.promisify(fs.readdir);
const writeFileAsync = util.promisify(fs.writeFile);
const statAsync = util.promisify(fs.stat);

const recursiveDirs = async (pathItems, batch = []) => {
  const directories = await Promise.all(
    pathItems.map((pathItem) =>
      readdirAsync(pathItem).then((dirItems) =>
        dirItems.map((dirItem) => path.resolve(pathItem, dirItem))
      )
    )
  );

  const folders = [];
  const files = [];

  for (directory of directories.flat(Infinity)) {
    const dirStats = await statAsync(directory);
    if (dirStats.isFile()) {
      files.push(directory);
    } else {
      folders.push(directory);
    }
  }

  if (folders.length) {
    return recursiveDirs(folders, [...batch, ...files]);
  } else {
    return [...batch, ...files];
  }
};

(async () => {
  const response = await recursiveDirs([path.resolve(__dirname, "foo")]);

  await writeFileAsync(
    path.resolve(__dirname, "lab-13.1.json"),
    JSON.stringify(response, null, 2)
  );
})();
