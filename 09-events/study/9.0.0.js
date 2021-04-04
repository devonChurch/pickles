"use strict"

const events = require("events");

const myEmitter = new events.EventEmitter();

const handleTwo = () => console.log("TWO")
myEmitter.on("count", handleTwo);

const handleThree = () => console.log("THREE")
myEmitter.once("count", handleThree);

const handleOne = () => console.log("ONE")
myEmitter.prependListener("count", handleOne);

myEmitter.on("error", (error) => console.error(error));


const emitListeners = (() => {
    let tick = 0;
     return (callback) => {
         tick += 1;
        setTimeout(() => {
            console.log("\n\n");
            callback?.()
            myEmitter.emit("count");
        }, tick)
        
    }
})()



emitListeners();


emitListeners(() => {
    console.log("callback 1");
    myEmitter.removeListener("count", handleOne)
});


emitListeners(() => {
    console.log("callback 2");
    myEmitter.removeAllListeners('count');
});

emitListeners(() => {
    console.log("callback 3");
    if (!myEmitter.listeners("count").length) {
        myEmitter.emit("error", new RangeError("not enough listeners!"))
    }
});



// (async () => {
//     await new Promise(resolve => {
//         setTimeout(resolve, 999999);
//     });
// })();
