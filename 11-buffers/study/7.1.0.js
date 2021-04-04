let value = "this is a long message!"

value = Buffer.from(value, "utf8")

value = JSON.stringify(value)

value = Buffer.from(JSON.parse(value).data, "utf8")

value = value.toString("base64")

value = Buffer.from(value, "base64")

value = value.toString("hex");

value = Buffer.from(value, "hex")

value = value.toString("utf8")

console.log("final value =", value);