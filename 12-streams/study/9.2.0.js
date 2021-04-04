"use strict";

const stream = require("stream");
const util = require("util");

const readStream = (() => {

    let tick = 0;
    let interval;

    interval = setInterval(() => {
        tick += 1;
        if (tick > 10) {
            clearInterval(interval)
        } else {
            process.stdin.push(`TICK: ${tick}`);
        }

    }, 200);

    return process.stdin;
})()

const writeStream = process.stdout;

readStream.on("error", (error) => console.error(error))
readStream.on("data", (data) => console.log(data));
stream.finished(
    readStream, (error) => {
        if (error) {
            console.error(error)
        }
    }
)

writeStream.on("error", (error) => console.error(error))
stream.finished(
    writeStream, (error) => {
        if (error) {
            console.error(error)
        }
    }
)

readStream.pipe(writeStream);