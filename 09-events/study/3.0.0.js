const events = require("events");

const carEmitter = new events.EventEmitter();

const handleMove = () => console.log("moving!");
const handleTurn = () => console.log("turning!");

carEmitter.on("move", handleMove)
carEmitter.on("turn", handleTurn)
carEmitter.once("fuel", () => console.log("refueling!"))
carEmitter.on("stop", () => {
    carEmitter.off("move", handleMove)
});
carEmitter.on("error", console.error);

let count = 0;
let interval;

interval = setInterval(() => {
    count += 1;

    if (count > 10) {
        clearInterval(interval);
        carEmitter.emit("error", new Error("Ran out of fuel"))
    } else if (count === 5) {
        carEmitter.emit("stop");
    } else if (count === 1) {
        carEmitter.emit("fuel")
    } else if (count % 2) {
        carEmitter.emit("turn");
    } else {
        carEmitter.emit("move")
    }
}, 500);