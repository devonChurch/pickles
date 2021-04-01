// --stack-trace-limit

console.log("start [itterations]");

// for (let index = 0; index <= 100; index += 1) {
//     if (index === 100) {
//         throw new RangeError("too many itterations!")
//     }
// }

const itterate = (index) => {
    if (index > 100) {
        throw new RangeError("too many itterations!")
    } else {
        itterate(index + 1)
    }
}

itterate(0)

console.log("end [itterations]");