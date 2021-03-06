const events = require("events");

class MyEmitter extends events.EventEmitter {
    constructor(options) {
        super(options)
    }

    emitTask(args) {
        this.emit("task", args)
    }

    removeAllTasks() {
        this.removeAllListeners("task")
    }
}

const emitter = new MyEmitter();

emitter.on("task", (task) => {
    if (task === "RUNNING") {
        console.log("start running!");
    }
})

emitter.on("task", (task) => {
    if (task === "COOKING") {
        console.log("cook dinner!");
    }
})

emitter.emitTask("RUNNING");
emitter.emitTask("COOKING");
emitter.emitTask("RUNNING");
emitter.emitTask("COOKING");

console.log("eventNames", emitter.eventNames());
console.log("getMaxListeners", emitter.getMaxListeners());
console.log("listenerCount", emitter.listenerCount("task"));
console.log("listeners", emitter.listeners("task"));

emitter.listeners("task").forEach((func) => func("RUNNING"))