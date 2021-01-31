const { clear } = require("console");
const events = require("events");

const boatEmitter = new events.EventEmitter();

const handleSail = (knots) => console.log(`sailing at ${knots} knots!`);
const handleTack = () => console.log(`tacking..... board down!`);
const handleDock = () => console.log(`docking boat...`);
const handleAnchor = () => {
  console.log(`dropping anchor!`);
  // boatEmitter.off("sail", handleSail);
  boatEmitter.removeAllListeners("sail")
};
boatEmitter.once("dock", handleDock);
boatEmitter.on("sail", handleSail);
boatEmitter.on("sail", handleTack);
boatEmitter.once("anchor", handleAnchor);
boatEmitter.on("error", console.error);

let tick = 0;
let interval;

interval = setInterval(() => {
  tick += 1;

  boatEmitter.emit("dock");

  if (tick > 10) {
    boatEmitter.emit("error", new RangeError("boat has sailed too far!"));
    clearInterval(interval);
  } else if (tick > 5) {
    boatEmitter.emit("anchor");
  }

  boatEmitter.emit("sail", tick * 10);

  console.log("tick complete\n");
}, 500);
