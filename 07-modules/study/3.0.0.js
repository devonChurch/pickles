const whereAmI = require.resolve(__filename);
console.log("whereAmI", whereAmI);

const isThisCalledFromTheCli = require.main === module;
console.log("isThisCalledFromTheCli", isThisCalledFromTheCli);
