const { StringDecoder} = require("string_decoder")

{
    console.log(StringDecoder);
    const buffer = Buffer.from("POTATO", "utf8");
    const decoder = new StringDecoder("utf8");

    console.log(
        decoder.write(buffer)
    );

}

{
    const fromJsonToString = (json) => {
        const buffer = Buffer.from(JSON.parse(json).data);
        return buffer.toString("utf8")
    }

    const fromStringToJson = (string) => {
        const buffer = Buffer.from(string);
        return JSON.stringify(buffer);
    }

    let value = "apple";
    value = fromStringToJson(value);
    console.log(value);
    value = fromJsonToString(value);
    console.log(value);
}