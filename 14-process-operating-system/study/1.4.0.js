const os = require("os")
const fsp = require("fs").promises;
const fs = require("fs");
const util = require("util");
const path = require("path");
const readdirAsync = util.promisify(fs.readdir)

{
    process.stdout.write(
          "platform:" + os.platform() + "\n"
        + "hostname:" + os.hostname() + "\n"
        + "homedir:" + os.homedir() + "\n"
        + "tmpdir:" + os.tmpdir() + "\n"
    )
}

(async () => {
    try {
        console.log("user tmpdir:");
    
        const tmpFolder = path.resolve(os.tmpdir(), "1-4-0");
    
        await fsp.mkdir(tmpFolder, { recursive: true });
    
        const items = await fsp.readdir(tmpFolder, { encoding: "utf8" });
    
        process.stdout.write(JSON.stringify(items.toString(), null, 2) + "\n")
    } catch (error) {
        process.stderr.write(error + "\n")
    } finally {
        process.stdout.write("complete!" + "\n")
    }
})();