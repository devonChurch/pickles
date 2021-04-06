"use strict";

// setup
// delete then make folder
// watch folder

// sequence (all on a 1000ms interval)
// make file
// make folder
// - add file
// delete folder
// delete root file

const path = require("path");
const os = require("os");
const fsp = require("fs").promises;
const chokidar = require('chokidar');

const rootDir = path.resolve(os.tmpdir(), "13-file-system-6.2.0")

const setup = async () => {

    await fsp.rmdir(rootDir, { recursive: true });
    await fsp.mkdir(rootDir)

}

const sequence = () => new Promise((resolve) => {

    const items = [
        () => fsp.writeFile(
            path.resolve(rootDir, "file-0"),
            "file zero content",
            { encoding: "utf8" }
        ),
        () => fsp.mkdir(
            path.resolve(rootDir, "folder-1")
        ),
        () => fsp.writeFile(
            path.resolve(rootDir, "file-1"),
            "file one content",
            { encoding: "utf8" }
        ),
        () => fsp.writeFile(
            path.resolve(rootDir, "file-0"),
            "some extra content!!!!",
            { encoding: "utf8", flag: "a" }
        ),
        () => fsp.rmdir(
            path.resolve(rootDir, "folder-1")
            , { recursive: true }
        ),
        () => fsp.unlink(
            path.resolve(rootDir, "file-0"),
        ),
    ];

    let tick = 0;
    let interval;

    interval = setInterval(async () => {

        const nextItem = items[tick];

        if (nextItem) {
            console.log("running tick", tick);
            await nextItem();
            tick += 1;
        } else {
            clearInterval(interval);
            resolve()
        }


    }, 1000)
})

const watchStuff = () => {

    const watcher = chokidar.watch(`${rootDir}/*`, {});
    const log = console.log;

    watcher
        .on('add', path => log(`File ${path} has been added`))
        .on('change', path => log(`File ${path} has been changed`))
        .on('unlink', path => log(`File ${path} has been removed`))
        .on('addDir', path => log(`Directory ${path} has been added`))
        .on('unlinkDir', path => log(`Directory ${path} has been removed`))
        .on('error', error => log(`Watcher error: ${error}`))

}

setup()
    .then(watchStuff)
    .then(sequence)
    .catch(error => console.error(error))
    .finally(() => process.exit());