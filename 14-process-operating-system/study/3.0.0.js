const os = require("os");

const cpuUsage = [];
const memoryUsage = []


process.stdin.on('data', (data) => {
    if (data.toString().trim() === "exit") {
        process.exit();
    }
    cpuUsage.push(process.cpuUsage());
    memoryUsage.push(process.memoryUsage())
});

process.on("exit", () => {
    console.log("CPU Usage:")
    console.table(cpuUsage)
    console.log("\n\nMemory Usage");
    console.table(memoryUsage)
    console.log(`\nPlatform: ${os.platform()}`);
    console.log(`\nUptime: ${process.uptime()}`);
    console.log(`\nTotal CPU time = ${(() => {
        const { user, system } = process.cpuUsage();
        return (user + system) / 1000000;
    })()}`);
})

process.stdin.pipe(process.stdout);