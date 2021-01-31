{
    console.log(require.resolve("path"));
    console.log(require.resolve("arg"));
    console.log(require.resolve(__filename));
}

{
    const hasBeenCalledFromTheCli = require.main === module;

    // node ./study/4.0.0.js ---> true
    // node -e "require('./study/4.0.0.js')" ---> false
    console.log("hasBeenCalledFromTheCli", hasBeenCalledFromTheCli);
}