const util = require("util");

const print = (err, contents) => {
  if (err) console.error(err);
  else console.log(contents);
};

const opA = (cb) => {
  setTimeout(() => {
    cb(null, "A");
  }, 500);
};

const opB = (cb) => {
  setTimeout(() => {
    cb(null, "B");
  }, 250);
};

const opC = (cb) => {
  setTimeout(() => {
    cb(null, "C");
  }, 125);
};

// Step 4.
Promise.all([
    util.promisify(opA)(),
    util.promisify(opB)(),
    util.promisify(opC)(),
]).then(responses => responses.forEach(print))

// Step 3.
// prettier-ignore
// opA((...args) => 
//     print(...args) || opB((...args) => 
//         print(...args) || opC((...args) => 
//             print(...args)
//         )
//     )
// );

// Step 2.
// opA((...args) => {
//         print(...args);
//         opB((...args) => {
//             print(...args);
//             opC((...args) => {
//                 print(...args);
//             })
//         })
//     }
// )

// Step 1.
// opA(
//     opB(
//         opC();
//     )
// )
