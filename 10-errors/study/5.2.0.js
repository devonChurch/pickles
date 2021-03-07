const events = require("events");
const server = new events.EventEmitter();


console.log({ events, server});

server.on("error", (error) => {
    if (error.code === "SERVER_DOWN") {
        console.log("restart server!")
    } else {
        console.error(error)
    }
});

let tick = 0;
let interval;

interval = setInterval(() => {
    tick += 1;

    console.log(`tick ${tick}`);

    if (tick === 5) {
        const error = new Error("server is down");
        error.code = "SERVER_DOWN";
        server.emit("error", error);
    } else if (tick < 5) {
        const error = new Error(`tick ${tick} is unstable!`)
        server.emit("error", error);
    }

    if (tick === 10) {
        clearInterval(interval)
    }
})