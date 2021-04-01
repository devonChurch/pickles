const buff1 = Buffer.alloc(10)

console.log("buff1", buff1);
console.log("length", buff1.length);

const quad = Math.floor(buff1.length / 3)

const quad1 = [0, quad]
const part1 = buff1.slice(...quad1)

const quad2 =[
    quad1[1], 
    quad1[1] + quad
]
const part2 = buff1.slice(...quad2)

const quad3 =[
    quad2[1], 
]
const part3 = buff1.slice(...quad3)

// Buffer.slide DOES NOT COPY
// Updating memory update ALL references!
part3[0] = 255;

console.log({
    buff1,
    quad,
    quad1, quad2, quad3,
    part1, part2, part3
});


