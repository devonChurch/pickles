const childProcess = require("child_process");
const stream = require("stream")

{
    const lsStream = childProcess.spawn("ls", ["-a"], {
        cwd: process.env.PWD,
        // stdio: ["pipe", "inherit", "pipe"]
        // stdio: [process.stdin, process.stdout, process.stderr]
    });
    
    // const grepStream = childProcess.spawn("grep", ["-e", "*.js"], {
    //     // stdio: ["pipe", "pipe", "pipe"]
    //     // stdio: [process.stdin, process.stdout, process.stderr]
    // })
    
    const writeStream = new stream.Writable({
        write(chunk, encoding, callback) {
            console.log(chunk.toString());
            callback(null);
        }
    })
    
    lsStream.stdout.pipe(grepStream.stdout).pipe(process.stdout)
    // lsStream.stdout.pipe(grepStream).pipe(writeStream)
    // lsStream.stdout.pipe(writeStream)
}

{

}