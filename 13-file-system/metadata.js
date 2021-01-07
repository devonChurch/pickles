const fs = require("fs");
const path = require("path");
const util = require("util");
const statAsync = util.promisify(fs.stat);
const lstatAsync = util.promisify(fs.lstat);
const filePath = path.resolve(__dirname, "file-1.txt");
const readDirAsync = util.promisify(fs.readdir);

// Stat.
{
  statAsync(filePath)
    .then((stat) => console.log("stat", stat))
    .catch(console.error);
}

// Lstat.
{
  lstatAsync(filePath)
    .then((lstat) => console.log("lstat", lstat))
    .catch(console.error);
}

// List all "file" statistics.
(async () => {
  try {
    const directories = await readDirAsync(__dirname);
    let files = [];
    for (directory of directories) {
        const stats = await statAsync(directory);
        if (stats.isFile()) {
            files.push(directory)
        }
    }
    console.log("files:", files);
  } catch (error) {
    console.error(error);
  }
})();

{
    const getStats = (directories) => Promise.all(directories.map(directory => statAsync(directory)))
    const getBirthTimes = stats => stats.map(stat => stat.birthtimeMs)
    const sortFromOldestToNewest = bithTimes => bithTimes.sort((t1, t2) => t1 - t2)

    readDirAsync(__dirname)
        .then(getStats)
        .then(getBirthTimes)
        .then(sortFromOldestToNewest)
        .then(birthTimes => console.log(birthTimes.map(birthTime => new Date(birthTime).toLocaleString())))
        .catch(console.error)
}