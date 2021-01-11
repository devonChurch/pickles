const childProcess = require("child_process");

{
  const spawn = childProcess.spawn(process.execPath, [
    "-e",
    `console.log("hello world")`,
  ]);

  // console.log("spawn:", spawn);
  spawn.stdout.on("data", (data) =>
    console.log("data: ", data.toString("utf8"))
  );
  spawn.stderr.on("error", console.error);
  spawn.on("close", (code) =>
    console.log(`closing ${code ? "unsuccessfully" : "successfully"} (${code})`)
  );
}

{
  try {
    const spawn = childProcess.spawnSync("/bin/sh", ["-c", `echo "potato!"`]);
    console.log(spawn);
    console.log(spawn.stdout.toString("utf8"));
  } catch (error) {
    console.error(error);
  }
}
