const { StringDecoder } = require("string_decoder");

{
  const myBuffer = Buffer.alloc(10);
  const isBuffer = myBuffer instanceof Buffer;
  console.log({ isBuffer, myBuffer });
}

{
  const buffer1 = Buffer.from("Hello");
  const buffer2 = Buffer.from("World");
  const combined = Buffer.concat([buffer1, buffer2]);
  console.log(combined.toString());
}

{
  const myBuffer = Buffer.from(`👍`);
  const [buffer1, buffer2, ...buffer3] = myBuffer;

  console.log({
    buffer1,
    buffer2,
    buffer3,
  });

  const decoder = new StringDecoder("utf8");

  console.log(decoder.write(Buffer.from([buffer1])));
  console.log(decoder.write(Buffer.from([buffer2])));
  console.log(decoder.write(Buffer.from(buffer3)));
}

{
    const fromStringToBuffer = (value) => {
        return Buffer.from(value)
    }

    const fromBufferToString = (value) => {
        return value.toString("utf8")
    }

    let foo = "hello world";
    foo = fromStringToBuffer(foo);
    console.log(foo);
    foo = fromBufferToString(foo);
    console.log(foo);
    foo = fromStringToBuffer(foo);
    console.log(foo);
}

{
    const fromBufferToJsonString = (value) => {
        return JSON.stringify(value);
    }

    const fromJsonStringToBuffer = (value) => {
        return Buffer.from(JSON.parse(value).data);
    }

    let foo = Buffer.from("hello world");
    foo = fromBufferToJsonString(foo);
    console.log(foo);
    foo = fromJsonStringToBuffer(foo);
    console.log(foo);
    foo = fromBufferToJsonString(foo);
    console.log(foo);
}