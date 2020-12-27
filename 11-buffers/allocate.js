{
  const myBuffer = Buffer.alloc(10);
  console.log(myBuffer);
}

{
  const myBuffer = Buffer.from("hello");
  console.log("default (utf-8)", myBuffer);
}

{
  const myBuffer = Buffer.from("hello", "utf-8");
  console.log("utf-8", myBuffer);
}

{
  const myBuffer = Buffer.from("hello", "utf16le");
  console.log("utf16le", myBuffer);
}

{
  const myBuffer = Buffer.from("hello");
  const myMessage = myBuffer.toString();
  console.log({ myBuffer, myMessage });
}

{
  const myBuffer = Buffer.from("hello");
  const myMessage = myBuffer.toString("base64");
  console.log({ myBuffer, myMessage });
}

{
  const myBuffer = Buffer.from("hello");
  const myMessage = myBuffer.toString("hex");
  console.log({ myBuffer, myMessage });
}
