const { StringDecoder } = require("string_decoder");

{
  const buffer = Buffer.from("€", "utf8");
  console.log(buffer.toString("hex")); // e282ac
}

{
  // Split the euro symbol (€) hex up into several buffers
  const bufferP1 = Buffer.from("e282", "hex");
  const bufferP2 = Buffer.from("ac", "hex");
  const decoder = new StringDecoder("utf-8");

  console.log(decoder.write(bufferP1)); // (nothing... not enough information)
  console.log(decoder.write(bufferP2)); // €
}
