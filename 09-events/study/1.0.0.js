const events = require("events");

const foodEmitter = new events.EventEmitter()

const eatFood = (food) => console.log(`Eating ${food}`);
const orderFood = eatFood;
const logError = console.log;
const addCost = ((cost = 0) => () => console.log(`Order more food! $${cost += 1}`))();

foodEmitter.addListener("eat", addCost);
foodEmitter.addListener("eat", eatFood);
foodEmitter.once("order", orderFood);
foodEmitter.addListener("error", logError);

let count = 0;
const interval = setInterval(() => {
    count += 1;
    console.log(`\nCount ${count}`);
    
    if (count > 5) {
        foodEmitter.emit("error", new Error("Broken!"))
        clearInterval(interval)
    } else if (count === 3) {
        foodEmitter.removeListener("eat", addCost);
    } else {
        foodEmitter.emit("order", "Chicken");
        foodEmitter.emit("eat", "Pancakes!");
        foodEmitter.emit("eat", "Banana.");
    }
}, 500);


foodEmitter.prependListener("eat", () => console.log("Drink some water before eating"));