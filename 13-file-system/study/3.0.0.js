// create watcher
// list changes moving forward
// make folder
// make 5 files
// read all files
// transform contents into UPPERCASE
// write/append ALL changes into single new file

const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const stream = require("stream");
const chokidar = require('chokidar');

(async () => {
    const myFolder = path.resolve(__dirname, "3-0-0");
    const watcher = chokidar.watch(`${myFolder}/*.txt`, {});
    const names = ["one", "two", "three", "four", "five"];
    const writeStream = fs.createWriteStream(path.join(myFolder, "uppercase.txt"), { flags: "a" });

    const transformStream = new stream.Transform({
        transform(chunk, encoding, callback) {
            const value = chunk.toString().toUpperCase();
            this.push(value + "\n");
            callback(null);
        }
    });

    const readStream = new stream.Readable({
        read() {}
    });

    stream.pipeline(
        readStream,
        transformStream,
        writeStream,
        (error) => {
            if (error) {
                console.error(error);
            } else {
                console.log("COMPLETE!!!!");
                fsp.rmdir(myFolder, { recursive: true })
                    .catch(error => console.error(error))
                    .then(() => process.exit(0));
            }
        }
    )
    
    watcher.on('add', (path) => {
        console.log(`File ${path} has been added`)
        fsp.readFile(path, { encoding: "utf8"})
            .then(data => readStream.push(data))
            .catch(error => console.error(error));
        
    });
    
    try {
        await fsp.mkdir(myFolder, { recursive: true });
        await Promise.all(names.map((name) => fsp.writeFile(
            path.join(myFolder, `${name}.txt`), name, { encoding: "utf8"}
        ))).then(() => readStream.push(null)); // <-- complete trigger
        
    } catch (error) {
        console.error(error);
    }
})();