const events = require("events");
const createDelay = (...args) =>
  new Promise((resolve) => setTimeout(resolve, 1000, ...args));

// Prototype "new" constructor
const myEventEmitter = new events.EventEmitter();

myEventEmitter.addListener("speak", (args) => console.log(args.join(" "))); // hello world
myEventEmitter.prependListener("speak", () =>
  console.log("speak the following words:")
);

Promise.all([createDelay("hello"), createDelay("world")]).then((responses) =>
  myEventEmitter.emit("speak", responses)
);

// Once.
myEventEmitter.once("sing", console.log);
myEventEmitter.emit("sing", "one");
myEventEmitter.emit("sing", "two"); // Will not trigger
myEventEmitter.emit("sing", "three"); // Will not trigger

// Remove Listener.
const haha = () => console.log("haha");
const lol = () => console.log("lol");
myEventEmitter.addListener("laugh", haha)
myEventEmitter.addListener("laugh", lol);

// myEventEmitter.removeListener("laugh", haha)
myEventEmitter.removeAllListeners("laugh")
myEventEmitter.emit("laugh");

// Error
myEventEmitter.addListener("error", console.error);
myEventEmitter.emit("error", new Error("There has been an error"));