const events = require("events");

const carEmitter = new events.EventEmitter();

const logAnEvent = action => () => console.log(`car is ${action}`);
const logAccelerate = logAnEvent("accelerating");
const logBrake = logAnEvent("braking");

carEmitter.on("accelerate", logAccelerate);
carEmitter.on("brake", logBrake);
carEmitter.on("error", console.error);

let count = 0;
const interval = setInterval(() => {
    count += 1;
    if (count > 5) {
        carEmitter.emit("error", new Error("You car broke down!"))
        clearInterval(interval);
    } else if (count === 3) {
        console.log("removing accelerate");
        carEmitter.off("accelerate", logAccelerate);
    } else {
        carEmitter.emit("accelerate");
        carEmitter.emit("brake");
    }
}, 1000)