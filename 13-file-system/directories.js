const { dir } = require("console");
const fs = require("fs");
const path = require("path");
const stream = require("stream");
const util = require("util");
const readdirAsync = util.promisify(fs.readdir);
const opendirAsync = util.promisify(fs.opendir);
const pipelineAsync = util.promisify(stream.pipeline)

// Sync.
{
  try {
    const dirs = fs.readdirSync(__dirname);
    console.log("sync", dirs);
  } catch (error) {
    console.error(error);
  }
}

// Callback.
{
  fs.readdir(__dirname, (error, dirs) => {
    if (error) {
      console.error(error);
    } else {
      console.log("callback", dirs);
    }
  });
}

// Promise.
{
  readdirAsync(__dirname)
    .then((dirs) => console.log("promise", dirs))
    .catch(console.error);
}

// Async/await.
(async () => {
  try {
    const dirs = fs.readdirSync(__dirname);
    console.log("async/await", dirs);
  } catch (error) {
    console.error(error);
  }
})();

// Recursion (get all files from inside all directories).
{
  const getFiles = async (prevPaths = [__dirname], output = []) => {
    // Get each directory from the list of previous paths
    // - turn a directory name into an absolute path (for both name collision and deduping!).
    const nextDirs = await Promise.all(
      prevPaths.map((prevPath) =>
        readdirAsync(prevPath, { withFileTypes: true }).then((dirs) =>
          dirs.map((dir) => {
            dir.name = path.resolve(prevPath, dir.name);
            return dir;
          })
        )
      )
    ).then((dirs) => dirs.flat(1));

    // Batch directories into Files and Paths.
    const { nextPaths, nextFiles } = nextDirs.reduce(
      (acc, dir) => ({
        ...acc,
        nextPaths: dir.isDirectory()
          ? [...acc.nextPaths, dir.name]
          : acc.nextPaths,
        nextFiles: dir.isFile() ? [...acc.nextFiles, dir.name] : acc.nextFiles,
      }),
      { nextPaths: [], nextFiles: [] }
    );

    // Update our recursive file list...
    output = [...output, ...nextFiles];

    return nextPaths.length
      ? // Carry on our recursive itteration...
        getFiles(nextPaths, output)
      : // ... or bail out and return the final output =)
        output;
  };

  getFiles().then((files) => console.log("recursion", files));
}


// Stream.
// {
//   fs.opendir(
//     __dirname,
//     { bufferSize: 3, encoding: "utf8" },
//     async (error, directories) => {
//       if (error) {
//         console.error(error);
//       } else {
//         console.log(directories);
//         for await (directory of directories) {
//             console.log(directory);
//         }
//       }
//     }
//   );

// const createTransformStream = () => {
//     new stream.Transform({
//         transform(buffer, encoding, next) {
//             const content = buffer.toString("utf8")
//             console.log({buffer, content});
//             next(null, "content")
//         }
        
//     })
// }

// opendirAsync(__dirname, { bufferSize: 3, encoding: "buffer"})
// opendirAsync(__dirname)
//     .then(directories => {
//         console.log(directories);
//         const readStream = stream.Readable.from(directories);
//         const transformStream = createTransformStream();

//         console.log({
//             "stream.Readable": stream.Readable,
//             readStream
//         });

//         readStream.on("data", (data) => console.log("data", data))

//         readStream.pipe(process.stdout)

//         // pipelineAsync(readStream, transformStream)
//         //     // pipelineAsync(readStream)
//         //     .catch(console.error)
//         //         .finally(() => console.log("complete!"))
//     })
// }
