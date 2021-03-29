console.log("swap process!!!");

process.stdin.on("data", (data) => {
    // do some stuff...
    console.log("data", data);
})


process.stdout.write("potato")
process.stdout.write("banana")
process.stdout.write("grape")