{
    const bufferToJson = (buffer) => {
        return JSON.stringify(buffer);
    }

    const jsonToBuffer = (json) => {
        return Buffer.from(JSON.parse(json).data);
    }

    const bufferToString = (buffer) => {
        return buffer.toString();
    }

    const stringToBuffer = (string) => {
        return Buffer.from(string);
    }

    let foo = stringToBuffer("Banana");
    console.log(foo);
    foo = bufferToJson(foo);
    console.log(foo);
    foo = jsonToBuffer(foo);
    console.log(foo);
    foo = bufferToString(foo);
    console.log(foo);
}