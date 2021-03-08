const fs = require("fs");
const path = require("path");
const util = require("util");
const readdirAsync = util.promisify(fs.readdir);
const statAsync = util.promisify(fs.stat);

const listFilesInDirectory = async (directories, prevFiles = []) => {
    const itemRefs = await Promise.all(
        directories.map(directory => 
            readdirAsync(directory)
                .then(refs => refs.map(ref => console.log({ directory, refs, ref}) || path.resolve(directory, ref))))
    ).then(items => items.flat(Infinity));

    const itemConfigs = await Promise.all(
        itemRefs
            .map(ref => statAsync(ref)
                .then(stat => ({ ref, stat }))
            )
        );
    
    const { files, folders } = itemConfigs.reduce((acc, config) => {
        const itemType = config.stat.isFile() ? "files" : "folders";
        return {
            ...acc,
            [itemType]: [ ...acc[itemType] || [], config ]
        }
    }, {});

    return folders
        ? listFilesInDirectory(folders.map(folder => folder.ref), [...prevFiles, files]) 
        : [...prevFiles, files];
}

(async () => {
    try {
        const files = await listFilesInDirectory(
            [path.resolve(process.cwd(), "foo")]
        );
        console.log("DONE!!!!", files);
    } catch(error) {
        console.error(error);
    }
})()