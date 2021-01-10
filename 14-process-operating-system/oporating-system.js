const os = require("os");

{
    // General Info.
    console.log(os.hostname());
    console.log(os.homedir());
    console.log(os.tmpdir());
    console.log(os.userInfo());

    // Performance:
    console.log(os.totalmem());
    console.log(os.freemem());
    console.log(os.arch());
    console.log(os.uptime() / 60 / 60 + "hours");
}