"use strict";

const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

const findAllJsFiles = async (prevDir = process.env.PWD, prevFiles = []) => {
    const allDirs = await fsp.readdir(prevDir)
        .then(dirs => dirs.map(dir => path.resolve(prevDir, dir)));
    const jsFiles = allDirs.filter(dir => path.parse(dir).ext === ".js")

    const nextFiles = [...prevFiles, ...jsFiles];
    const nextDir = path.join(prevDir, "../");

    console.log("nextDir", nextDir);

    return nextDir === prevDir
        ? nextFiles
        :  findAllJsFiles(
            path.join(prevDir, "../"),
            nextFiles
        );
}

findAllJsFiles()
    .then(files => console.log("files!", files))
    .catch(error => console.error(error));