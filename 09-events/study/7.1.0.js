const events = require("events");

{
    class MyEmitter extends events.EventEmitter {
        constructor(options) {
            super(options)
        }

        emitSomething(something) {
            this.emit("something", something)
        }

        destroySomething() {
            this.removeAllListeners("something");
        }
    }

    const myEmitter = new MyEmitter();

    myEmitter.on("something", (something) => process.stdout.write("Do: " + something + "\n"))
    myEmitter.emitSomething("running!");
    myEmitter.destroySomething();
    myEmitter.emitSomething("eating!");
}