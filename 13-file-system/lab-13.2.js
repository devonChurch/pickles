const fs = require("fs");
const path = require("path");
const util = require("util");
const chokidar = require("chokidar");
const rmAsync = util.promisify(fs.rmdir);
const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);
const unlinkAsync = util.promisify(fs.unlink);

(async () => {

    try {
        const rootFolder = path.resolve(__dirname, "lab-13.2");
        const eventFile = path.resolve(__dirname, "lab-13.2.txt");

        await rmAsync(rootFolder, {recursive: true});
        await mkdirAsync(rootFolder);
        await writeFileAsync(eventFile, '');
        
        const watcher = chokidar.watch(`${rootFolder}/*`, { persistent: true});
        const logWatchEvent = (eventType) => async (eventPath) => await 
        console.log(`${eventType}: ${eventPath}\n--> ${new Date().toLocaleString()}\n\n`) ||
        writeFileAsync(
            eventFile,
            `${eventType}: ${eventPath}\n--> ${new Date().toLocaleString()}\n\n`,
            { flag: "a"}
        );
        
        // watcher.on("all", logWatchEvent("all"));
        watcher.on("change", logWatchEvent("change"));
        watcher.on("add", logWatchEvent("add"));
        watcher.on("unlink", logWatchEvent("unlink"));
        watcher.on("addDir", logWatchEvent("addDir"));
        watcher.on("error", console.error);

        await writeFileAsync(path.resolve(rootFolder, "file-1.txt"), `File One!`);
        await writeFileAsync(path.resolve(rootFolder, "file-1.txt"), `\nBanana`, { flag: "a"});
        await writeFileAsync(path.resolve(rootFolder, "file-2.txt"), `File Two!`);
        await unlinkAsync(path.resolve(rootFolder, "file-2.txt"));
        
        
    } catch (error) {
        console.error(error);
    }

})()
