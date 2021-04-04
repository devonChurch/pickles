const util = require("util");

const getAreaOfSquare = (side, callback) => {

    setTimeout(() => {
        let error = null;
        
        if (typeof side != "number") {
            error = new TypeError("side must be a number");
        }

        callback(error, error ? undefined : side * side);
    }, Math.random() * 1000)
}

const getAreaOfSquareAsync = util.promisify(getAreaOfSquare);

module.exports.getAreaOfSquare = getAreaOfSquare;
module.exports.getAreaOfSquareAsync = getAreaOfSquareAsync;

// console.log("callback");
// getAreaOfSquare(3, (error, area) => {
//     if (error) {
//         console.error("callback", error);
//     } else {
//         console.log("callback", area);
//     }
// })

// console.log("promise");
// getAreaOfSquareAsync(5)
//     .then((area) => console.log("promise", area))
//     .catch(error => console.error("promise", error));

// console.log("async/await");
// (async () => {
//     try {
//         const area = await getAreaOfSquareAsync(2);
//         console.log("async/await", area);
//     } catch (error) {
//         console.error("async/await", error);
//     }
// })()