const isProgramMode = require.main === module;

// console.log("isProgramMode", isProgramMode);
// console.log(require.main);

if (isProgramMode) {
  console.log("42");
} else {
  module.exports = (num1, num2) => num1 + num2;
}
