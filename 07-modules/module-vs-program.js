const isRunningAsProgram = Boolean(require.main === module);
const turnIntoUpperCase = (text) => text.toUpperCase();

if (isRunningAsProgram) {
  // Run as `node module-vs-program.js --text=potato` // POTATO
  console.log("running as program");
  const args = require("arg")({ "--text": String }, { argv: process.argv });
  console.log(turnIntoUpperCase(args["--text"]));
} else {
  // Run as `node --print "require('./module-vs-program')('potato')"` // POTATO
  console.log("running as module");
  module.exports = turnIntoUpperCase;
}
