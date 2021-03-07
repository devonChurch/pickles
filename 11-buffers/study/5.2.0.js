const { access } = require("fs");
const {StringDecoder} = require("string_decoder");

console.log({StringDecoder});

const emoji = Buffer.from("🍌");
const part1 = emoji.slice(0, 1);
const part2 = emoji.slice(1);

console.log({
    part1,
    part2
});

let result = "";
const decoder = new StringDecoder();

[part1, part2].forEach(part => result += decoder.write(part))
console.log(result);