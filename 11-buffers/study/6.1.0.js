// from string, utf8 <--+
// to buffer            |
// to base64            |
// to buffer            ^
// to json              |
// to buffer            |
// to hex               ^
// to buffer            |
// to string, utf8 -->--+

let value = "the quick brown fox";
console.log(`let value = "the quick brown fox";`, value);

value = Buffer.from(value, "utf8")
console.log(`value = Buffer.from(value, "utf8")`, value);

value = value.toString("base64")
console.log(`value = value.toString("base64")`, value);

value = Buffer.from(value, "base64")
console.log(`value = Buffer.from(value, "base64")`, value);

value = JSON.stringify(value)
console.log(`value = JSON.stringify(value)`, value);

value = Buffer.from(JSON.parse(value).data)
console.log(`value = Buffer.from(JSON.parse(value).data)`, value);

value = value.toString("hex")
console.log(`value = value.toString("hex")`, value);

value = Buffer.from(value, "hex")
console.log(`value = Buffer.from(value, "hex")`, value);

value = value.toString("utf8")
console.log("final/starting value....", value);