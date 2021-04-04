const { StringDecoder } = require("string_decoder");

const splitUpBuffer = (myBuffer, splits) => {

    const totalLength = myBuffer.length;
    const partLength = totalLength / splits;

    return new Array(splits).fill(0).map((_, index) => {
        return myBuffer.slice(index * partLength, index * partLength + partLength)
    })
}


// const splitBuffer = splitUpBuffer(Buffer.alloc(30), 7)
const splitBuffer = splitUpBuffer(Buffer.from("hello world!", "utf8"), 7)

console.log({splitBuffer});

(() => {
    const decoder = new StringDecoder("utf8")

    const message = splitBuffer.reduce((acc, part) => {
        return acc += decoder.write(part)

    }, "")

    console.log({message});
})()