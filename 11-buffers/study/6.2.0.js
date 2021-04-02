const { StringDecoder } = require('string_decoder');

const message = "the quick brown 🦊 jumps over the lazy 🐶."
const messageAsBase64 = Buffer.from(Buffer.from(message, "utf8").toString("base64"), "base64")

console.log({ message, messageAsBase64 });

const chunksTotal = 7;
const chunksLength = Math.floor(messageAsBase64.length / chunksTotal);
const chunks = new Array(chunksTotal).fill("").map((_, index) => (
    messageAsBase64.slice(
        index * chunksLength,
        index === chunksTotal -1 ? undefined : (index * chunksLength) + chunksLength,
    )
))

console.log({ chunksTotal, chunksLength, chunks });

const decoder = new StringDecoder("base64")
const constructedMessage = chunks.reduce((acc, chunk) => {
    return acc += decoder.write(chunk);
}, "")

console.log({ constructedMessage, asUtf8: Buffer.from(constructedMessage, "base64").toString("utf8") });
