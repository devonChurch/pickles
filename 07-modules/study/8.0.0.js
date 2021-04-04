"use strict"

const findTheAreaOfASquare = (side) => {
    return side * side;
}

const isModule = require.main !== module;

if (isModule) {
    module.exports = findTheAreaOfASquare
} else {
    const argv = require('yargs-parser')(process.argv.slice(2));
    process.stdout.write(findTheAreaOfASquare(argv.side) + "")
}