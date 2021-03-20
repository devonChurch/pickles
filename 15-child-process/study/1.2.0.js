const childProcess = require("child_process");
const stream = require("stream");
const util = require("util")


{
    const spawnStream = childProcess.spawn(process.execPath, ["-p", "process.env"], { env: { ...process.env, POTATO: "banana" }});
    spawnStream.stdout.pipe(process.stdout)
    stream.finished(process.stdout, (error) => {
        if (error) {
            console.error("** error", error)
        } else {
            console.log("complete!");
        }
    })
}

{
    const spawn = childProcess.spawnSync(process.execPath, ["-p", "process.cwd()"]);
    console.log({
        status: spawn.status,
        stdout: spawn.stdout.toString(),
        stderr: spawn.stderr.toString()
    });
}