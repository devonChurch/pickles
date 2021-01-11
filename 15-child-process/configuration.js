const childProcess = require("child_process");
const path = require("path")
const util =  require("util");
const execAsync = util.promisify(childProcess.exec);

process.env.POTATO = "potato!"

{
    const spawnStream = childProcess.spawn(process.execPath, ["-e", `console.log(process.env.POTATO)`]);
    spawnStream.stdout.pipe(process.stdout); // "potato!" ... inherited from parent process
}

{
    const spawnStream = childProcess.spawn(
        process.execPath,
        ["-e", `console.log(process.env.POTATO)`],
        { env: { POTATO: "banana!"}} // Note: this replaces not spreads onto existing process.env config.
    );
    spawnStream.stdout.pipe(process.stdout); // "banana!" ... overridden in child process
}

{
    execAsync(`ls -a`, { cwd: path.resolve("/") })
        .then(console.log)
        .catch(console.error)
}

{
    const spawnStream = childProcess.spawn(
        process.execPath,
        ["-e", "setTimeout(() => console.log('hello world'), 1000)"],
        { stdio: "inherit" } // push straight to process.stdin/stdout/stderr
    );
}