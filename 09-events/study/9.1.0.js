const events = require("events");

class MyEmitter extends events.EventEmitter {
    constructor() {
        super();
    }

    addEvent(type, name, callback) {
        this[type](name, callback)
    }

    removeEvent(name, callback) {
        this.removeListener(name, callback)
    }

    emitEvent(name, params) {
        this.emit(name, params)
    }
}

const myEmitter = new MyEmitter();

const handleOne = (args) => console.log("one", args);
myEmitter.addEvent("addListener", "count", handleOne);
myEmitter.emitEvent("count", [1, 2, 3]);
myEmitter.addEvent("once", "count", (args) => console.log("two", args));
myEmitter.emitEvent("count", [4, 5, 6]);
myEmitter.emitEvent("count", [7, 8, 9]);
myEmitter.removeEvent("count", handleOne)
myEmitter.emitEvent("count", [10, 11, 12]);

