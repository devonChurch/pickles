/**
 * # Preloading Modules
 * 
 * Require modules with --require by "path" or "node_module" namespace.
 * 
 * @example
 * node --require ./run-first.js run-second.js
 */
// global.runFirst();
// console.log("run second");

const chalk = require("chalk");

console.log(chalk.blue('Hello world!'));