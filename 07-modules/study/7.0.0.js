const isProgram = require.main === module;

console.log({ isProgram, argv: process.argv });

const calculateArea = (side) => console.log(side * side);

if (isProgram) {
    // node study/7.0.0.js --side="5"

    // const { side } = process.argv.slice(2).reduce((acc, argv) => {
    //     const [key, value] = argv.split("=");
    //     return { ...acc, [key.replace("--", "")]: Number(value) }
    // }, {})
    
    const {side } = require('yargs-parser')(process.argv.slice(2));
    
    calculateArea(side);
} else {
    // node -e "require('./study/7.0.0')(8)"

    module.exports = calculateArea;
}