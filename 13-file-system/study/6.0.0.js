"use strict";

// create 5 files
// make a change randomly to one file
// find the last file that was changed

const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const os = require("os");

const createFileName = (index) => `13-file-system-6.0.0-file-${index}\n`;

const createFiles = () => {
    return Promise.all(new Array(5)
        .fill("")
        .map((_, index) => createFileName(index))
        .map(item => fsp.writeFile(
            path.resolve(os.tmpdir(), item),
            `+ content for file ${item}`,
            { encoding: "utf8" }
        )));
}

const modifyOneFile = () => {
    const index = Math.floor(Math.random() * 4);
    const filePath = path.resolve(os.tmpdir(), createFileName(index));
    
    return fsp.readFile(filePath, { encoding: "utf8"})
        .then(data => 
            fsp.writeFile(filePath, `+ modified on ${Date().toLocaleString()}`, { encoding: "utf8", flag: "a" })
        )
};

const getLastModifiedFile = async () => {
    const fileNames = await fsp.readdir(
        path.resolve(os.tmpdir())
    ).then(fileNames => fileNames.filter(fileName => fileName.startsWith("13-file-system-6.0.0")));

    const fileStats = await Promise.all(fileNames.map(
        fileName => fsp.stat(
            path.resolve(os.tmpdir(), fileName)
        ).then(stat => Object.create(stat, {
            fileName: {
                value: fileName
            }
        }))
    ));

    console.log({ fileStats });

    const lastModified = fileStats.reduce((acc, stat) => {
        return stat.mtime > acc.mtime
            ? stat
            : acc;
    }, fileStats[0])
    
    return `${lastModified.fileName} was last modified on ${lastModified.mtime}.`
}

createFiles()
    .then(modifyOneFile)
    .then(getLastModifiedFile)
    .then(answer => console.log(answer))
    .catch(error => console.error(error));