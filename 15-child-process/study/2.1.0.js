const childProcess = require("child_process");
const stream = require("stream")

{
    childProcess.exec(`ls -a`, (error, stdout, stderr) => {
        if (error) {
            console.log("exec", error)
        } else {
            console.log("exec", stdout, stderr);
        }
    });
}

{
    try {
        const response = childProcess.execSync(`ls -a`)
        console.log("exec sync", response.toString());
    } catch (error) {
        console.error("exec sync", error)
    }
}

{
    try {
        const response = childProcess.spawnSync("ls", ["-a"])
        console.log("spawn sync", response.stdout.toString(), response.stderr.toString());
    } catch (error) {
        console.error("spawn sync", error)
    }
}

{
    const lsStream = childProcess.spawn("ls", ["-a"]);
    const writeStream = new stream.Writable({
        write(chunk, encoding, callback) {
            console.log("spawn", chunk.toString());
            callback(null)
        }
    })


    lsStream.stdout.pipe(writeStream)

    lsStream.on("error", error => console.error(error));

    stream.finished(lsStream, (error) => {
        if (error) {
            console.error(error)
        }
    })

}