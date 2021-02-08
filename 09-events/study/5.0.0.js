const events = require("events");

{
    const myEmitter = new events.EventEmitter();

    const sendFoo = () => console.log("foo");
    const sendBar = () => console.log("bar");
    const sendBaz = () => console.log("baz");
    
    myEmitter.once("foo", sendFoo)
    myEmitter.on("foo", sendBar)
    myEmitter.on("foo", sendBaz)
    myEmitter.on("error", console.error)

    let tick = 0;
    let interval;

    interval = setInterval(() => {
        tick += 1;
        
        if (tick > 10) {
            clearInterval(interval);
        } else if (tick > 9) {
            myEmitter.emit("error", RangeError("too may ticks"))
        } else if (tick > 5) {
            // myEmitter.off("foo", sendBar);
            myEmitter.removeAllListeners("foo")
        }

        myEmitter.emit("foo")
    }, 200)

}