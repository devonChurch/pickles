const path = require("path");

{
    // Current working directory:
    console.log(process.cwd());
    process.chdir(path.resolve(process.cwd(), "../13-file-system"));
    console.log(process.cwd());

    // Environment variables:
    console.log(process.env);
    process.env.POTATO = "potato!"
    console.log(process.env);

    // OS platform (darwin = MacOS):
    console.log(process.platform);

    // Performance:
    console.log(process.cpuUsage()); // { user: 42349, system: 11279 }
    console.log(process.uptime()); // 0.046677908
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const letters = new Array(1000000).fill(0).map((_, index) => Math.sqrt(index * Math.random())).map(value => alphabet[Math.floor(value % (alphabet.length - 1))]);
    console.log(letters);
    console.log(process.cpuUsage()); // { user: 67778, system: 14819 }
    console.log(process.uptime()); // 0.201190355
    console.log(process.memoryUsage());
}