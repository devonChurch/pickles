const events = require("events");

const emitter = new events.EventEmitter();

const handleOne = () => console.log("ONE!");
emitter.addListener("one", handleOne);

const handleTwo = () => console.log("TWO!")
emitter.on("two", handleTwo)

const handleThree = () => console.log("THREE!");
emitter.once("three", handleThree)

const handleOnePartTwo = () => console.log("ONE.. part two!");
emitter.prependListener("one", handleOnePartTwo)

let tick = 0;
let loop;

loop = setInterval(() => {
    tick += 1;
    console.log(`\n\ntick: ${tick}\n`);
    if (tick > 10) {
        clearInterval(loop)
    };

    if (tick === 10) {
        emitter.emit("error", new RangeError("10 ticks is too many!"))
    } else if (tick > 7) {
        emitter.removeAllListeners("one");
    } else if (tick > 5) {
        emitter.removeListener("two", handleTwo)
    } else if (tick > 3) {
        emitter.emit("three")
    } else if (tick > 1) {
        emitter.emit("two")
    }

    emitter.emit("one")
}, 200)