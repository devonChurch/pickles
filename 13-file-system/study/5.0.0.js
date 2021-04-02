const path = require("path");
const fs = require("fs");
const fsp = require("fs").promises;
const os = require("os");

// recursively go through directory
// get all .txt files


// Simple:
// + Basic isFile comparison through path.parse(...).ext
// {
//     const recurse = async (prevDirectories = [], prevFileNames = []) => {


//         const items = await Promise.all(
//             prevDirectories
//                 .map(directory => 
//                     fsp.readdir(directory)
//                         .then(items => items.map(item => path.join(directory, item)))
//                 )
//         ).then(items => items.flat(Infinity));

//         const next = items.reduce((acc, item) => {
//             const isFile = Boolean(path.parse(item).ext);
//             return {
//                 directories: isFile ? acc.directories : [...acc.directories, item],
//                 fileNames: !isFile ? acc.fileNames : [...acc.fileNames, item],
//             };
            
//         }, { directories: [], fileNames: [] })

//         const nextDirectories = next.directories;
//         const nextFileNames = [...prevFileNames, ...next.fileNames];

//         return nextDirectories.length
//             ? await recurse(nextDirectories, nextFileNames)
//             : nextFileNames
//     }

//     recurse(
//         [path.resolve(__dirname, "../", "../")]
//     )
//         .then(fileNames => console.log("complete!", fileNames))
//         .catch(console.error)
// }

// Complex:
// + Robust isFile comparison thorugh await fs.promises.stat(...).isFile()
{
    const recurse = async (prevDirectories = [], prevFileNames = []) => {


        const items = await Promise.all(
            prevDirectories
                .map(directory => 
                    fsp.readdir(directory)
                        .then(items => items.map(item => path.join(directory, item)))
                )
        ).then(items => items.flat(Infinity));

        const next = await Promise.all(items.map(async (item) => {
            const status = await fsp.stat(item);
            status.fullPathItem = item;
            return status;
        })).then(enrichedItems => enrichedItems.reduce((acc, item) => {
            const isFile = item.isFile();
            return {
                directories: isFile ? acc.directories : [...acc.directories, item.fullPathItem],
                fileNames: !isFile ? acc.fileNames : [...acc.fileNames, item.fullPathItem],
            };
            
        }, { directories: [], fileNames: [] }));

        const nextDirectories = next.directories;
        const nextFileNames = [...prevFileNames, ...next.fileNames];

        return nextDirectories.length
            ? await recurse(nextDirectories, nextFileNames)
            : nextFileNames
    }

    recurse(
        // [path.resolve(__dirname, "../", "../")]
        [path.join(os.tmpdir(), "5.1.0")]
    )
        .then(fileNames => console.log("complete!", fileNames))
        .catch(console.error)
}