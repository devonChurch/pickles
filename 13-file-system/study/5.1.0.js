const os = require("os");
const fsp = require("fs").promises;
const path = require("path");
const chokidar = require('chokidar');

const createDelay = (delay) => () => new Promise((resolve) => setTimeout(() => resolve(), delay));
const delay100ms = createDelay(100);
const delay10ms = createDelay(10);

(async () => {

    try {
        const ROOT_DIR = path.join(os.tmpdir(), "5.1.0");

        /* --> bin everything */ await fsp.rmdir(ROOT_DIR, { recursive: true });

        console.log("1. reset");
    
        const ACTIONS = []
    
        await fsp.mkdir(ROOT_DIR);

        console.log("2. root directory");
    
        const watcher = chokidar.watch(".", {
            cwd: ROOT_DIR,
            usePolling: true,
        });
    
        watcher
            .on('add', path => console.log(`File ${path} has been added`))
            .on('change', path => console.log(`File ${path} has been changed`))
            .on('unlink', path => console.log(`File ${path} has been removed`))
            .on('addDir', path => console.log(`Directory ${path} has been added`))
            .on('unlinkDir', path => console.log(`Directory ${path} has been removed`));

        console.log("3. watchers");
    
    
        process.on("exit", () => console.log("Completed Actions!", JSON.stringify(ACTIONS, null, 2)));


        const directories = [
            path.join(ROOT_DIR, "folder-1"),
            path.join(ROOT_DIR, "folder-1", "folder-2")
        ]
        await Promise
            .all(directories.map(directoryPath => fsp.mkdir(directoryPath, { recursive: true })))
            // .then(() => directories.map(folder => watcher.add(folder)))

        console.log("4. folders");

        const files = [
            path.join(ROOT_DIR, "file-0.txt"),
            path.join(ROOT_DIR, "folder-1", "file-1.txt"),
            path.join(ROOT_DIR, "folder-1", "folder-2", "file-2.txt")
        ]
        await Promise.all(files.map(filePath => 
            fsp.writeFile(
                filePath,
                `file one content for ${path.parse(filePath).base}.`,
                { encoding: "utf8"})
            )
        )
        .then(delay10ms)
            // .then(() => files.map(file => watcher.add(file)))

        console.log("5. files");

        // await delay();

        await fsp.writeFile(
            files[0],
            Buffer.from("potato!", "utf8").toString("base64"),
            { encoding: "base64"}
        )
        .then(delay10ms);

        console.log("6. make some changes");

        // await delay();

        // process.exit(0);

    } catch (error) {
        console.error(error);
    }

})();
