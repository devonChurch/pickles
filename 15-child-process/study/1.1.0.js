const childProcess = require("child_process");
const stream = require("stream")
const {StringDecoder} = require("string_decoder")

{
    const response = childProcess.spawnSync(process.execPath, ["-p", `fs.readdirSync(path.join("${__dirname}", "../"), { encoding: "utf8"})`]);
    console.log({
        "status": response.status,
        "stdout": response.stdout.toString(),
        "stderr": response.stderr.toString(),
    });
}

{
    const response = childProcess.spawnSync(process.execPath, ["-e", `throw new Error("its broken!")`]);
    console.log({
        "status": response.status,
        "stdout": response.stdout.toString(),
        "stderr": response.stderr.toString(),
    });
}

{
    const spawnStream = childProcess.spawn(process.execPath, ["-p", "new Array(100).fill(0).map((_, index) => Math.random() * index)"]);

    const { values, writeStream} = (() => {
        const values = [];
        const decoder = new StringDecoder("utf8");

        const writeStream = new stream.Writable({
            write(chunk, encoding, callback) {
                const decoded = decoder.write(chunk)
                const json = JSON.parse(decoded);
                
                json.map(value => values.push(value));
                callback(null)
            }
        });

        return { values, writeStream} 
    })();

    stream.pipeline(spawnStream.stdout, writeStream, (error) => {
        if (error) {
            console.error(error)
        } else {
            console.log("complete!!!", values);
        }
    })
}