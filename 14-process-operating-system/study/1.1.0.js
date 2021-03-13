{
    process.on("exit", () => {
        process.stdout.write(
            `exit with code ${process.exitCode}`
        )
    })
}

{
    // let tick = 0;
    // let interval;

    // interval = setInterval(() => {
    //     tick += 1;
    //     process.stdout.write("tick", tick);
    //     if (tick === 5) {
    //         process.exitCode = 1;
    //     }
    //     if (tick === 10) {
    //         process.exit();
    //     }
    // }, 200)
}

{
    // process.stdout.write("next...");
    // process.exit(1);
}


{
    setTimeout(() => {
        // throw new Error("broken!!!")
        // process.stdout.write("working!")
        process.exit(1)
    }, 1000)
}
