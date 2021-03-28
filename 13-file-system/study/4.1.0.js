const chokidar = require('chokidar');
const fsp = require("fs").promises;
const path = require("path");
const util = require("util")
const nextTickAsync = util.promisify(process.nextTick)

const watcher = chokidar.watch(`${__dirname}/4**`, {});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))
  .on('addDir', path => console.log(`Directory ${path} has been added`))
  .on('unlinkDir', path => console.log(`Directory ${path} has been removed`))
  .on('error', error => console.error(`Watcher error: ${error}`));


(async () => {

    const dir = path.resolve(__dirname, "4-1-0");
    const files = ["one", "two", "three"].map(file => path.join(dir, `${file}.txt`));

    console.log("clean up!");
    await fsp.rmdir(dir, { recursive: true });

    console.log("start sequence...");
    await fsp.mkdir(dir);

    console.log("create files...");
    await Promise.resolve(
        files
            .map(file => 
                fsp.writeFile(
                    file,
                    file,
                    { encoding: "utf8" }
                ).then(() => watcher.add(file))
            )
    );

    console.log("update files...");
    await Promise.resolve(
        files
            .map(file => 
                fsp.readFile(file, { encoding: "utf8"})
                    .then(data => fsp.writeFile(file, `${data}\n${data}`, { encoding: "utf8", flags: "a" }))
            )
    );

    console.log("remove files");
    await Promise.resolve(
        files
            .map(file => 
                fsp.unlink(file)
                    .then(() => watcher.unwatch(file))
            )
    );

    const waitOneSecond = () => new Promise(resolve => setTimeout(resolve, 1000));

    await waitOneSecond();

    await watcher.close();

    console.log("complete!");

})();