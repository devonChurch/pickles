const events = require("events");

console.log(
    require.resolve("events")
)

const myEmitter = new events.EventEmitter();

const handleBite = () => console.log("take a bite");
const handleChew = () => console.log("chew food");
const handleSwallow = () => console.log("swallow food");

myEmitter.on("eat", handleBite);
myEmitter.on("eat", handleChew);
myEmitter.on("eat", handleSwallow);

const handleDrink = () => {
    console.log("take a sip");
    myEmitter.removeListener("eat", handleBite);
}
myEmitter.once("drink", handleDrink);

let tick = 0;
let interval;

interval = setInterval(() => {
    tick += 1;
    console.log(`tick: ${tick}`);

    if (tick > 15) {
        clearInterval(interval);
    }
    if (tick > 10) {
        myEmitter.removeAllListeners("eat")
    }
    if (tick > 5) {
        myEmitter.emit("drink");
    }
    myEmitter.emit("eat")
}, 200)
