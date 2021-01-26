{
    const myBuffer = Buffer.from("Hello!", "utf8")
    console.log(myBuffer);
}

{
    const fromStringToBase64 = (value) => {
        const buffer = Buffer.from(value, "utf8");
        return buffer.toString("base64")
    }

    const fromBase64ToString = (value) => {
        const buffer = Buffer.from(value, "base64");
        return buffer.toString("utf8")
    }

    let myValue = fromStringToBase64("Hello world!");
    console.log(myValue);
    
    myValue = fromBase64ToString(myValue);
    console.log(myValue);
    
    myValue = JSON.stringify(Buffer.from("potato"));
    console.log(myValue);

}