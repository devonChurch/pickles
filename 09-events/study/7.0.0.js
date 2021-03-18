const events = require("events");

const myEmitter = new events.EventEmitter();

const handleWork = (something) => process.stdout.write("Work: " + something + "\n");
const handleSleep = (something) => process.stdout.write("Sleep: " + something + "\n");
const handlePlay = (something) => process.stdout.write("Play: " + something + "\n");
const handleEat = (something) => process.stdout.write("Eat: " + something + "\n");

myEmitter.on("something", handleWork);
myEmitter.addListener("something", handleSleep)
myEmitter.prependListener("something", handlePlay);
myEmitter.once("something", handleEat)

myEmitter.on("error", error => console.error(error));

myEmitter.emit("something", "potato")
console.log("");
myEmitter.emit("something", "banana")
console.log("");
myEmitter.removeListener("something", handleWork);
myEmitter.emit("something", "apple")
console.log("");
myEmitter.removeAllListeners("something");
myEmitter.emit("something", "carrot")
console.log("");
myEmitter.emit("error", new RangeError("there a no more events!"))
