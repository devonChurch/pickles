{
    let count = 5;

    const interval = global.setInterval(doTask, 500)
    function doTask() {
        console.log(`running tast ${count}`);
        count -= 1;
        if (!count) {
            console.log("exiting!");
            // global.clearInterval(interval); // No need for this as the process will be destroyed.
            process.exit(0); // Successfully exit = code 0.
        }
    }

    process.on("exit", () => {
        console.log(`exiting on count: ${count}`);
    })
}