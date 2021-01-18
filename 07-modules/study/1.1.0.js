const isCalledFromCli = require.main === module;

if (isCalledFromCli) {
  const args = process.argv
    .slice(2)
    .map((arg) => arg.split("="))
    .reduce(
      (acc, [key, value]) => ({ ...acc, [key.replace("--", "")]: value }),
      {}
    );

    // node study/1.1.0.js --fruit="apples"
    console.log(`Called from the command line:`)
  console.log(`* I like eating ${args.fruit}.`);
// I like eating apples.


} else {

    module.exports = (args) => {
        console.log(`Called as an exported module:`)
        console.log(`* I like eating ${args.fruit}.`);
    }
}
