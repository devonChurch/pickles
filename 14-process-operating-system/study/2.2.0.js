"use strict"

const pid = process.pid;

console.log({ pid });

process.on("exit", () => console.log(`killing process ${pid}`));

(async () => {

    // Keep the process running for a loooooong time!
    new Promise(resolve => setTimeout(() => {
        resolve()
    }, 999999999))

})();

process.kill(pid)

