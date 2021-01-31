const { StringDecoder } = require("string_decoder")


{
    let buffer = Buffer.from("hello!", "utf8");
    console.log(buffer);

    buffer = buffer.toString("utf8")
    console.log(buffer);
    
    buffer = JSON.stringify(Buffer.from(buffer));
    console.log(buffer);
    
    buffer = Buffer.from(JSON.parse(buffer).data);
    console.log(buffer);
    
    buffer = buffer.toString("base64")
    console.log(buffer);
    
    buffer = Buffer.from(buffer, "base64").toString("utf8");
    console.log(buffer);
}

{
    let buffer = Buffer.from(`🍌`);
    let buffer1 = buffer.slice(0, 2);
    let buffer2 = buffer.slice(2)

    console.log({ buffer, buffer1, buffer2 });

    const decoder = new StringDecoder();

    console.log(decoder.write(buffer1))
    console.log(decoder.write(buffer2))
}
