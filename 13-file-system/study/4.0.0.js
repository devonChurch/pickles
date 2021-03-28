const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

const data = (
`+ apple
+ banana
+ grape`
);

const filePath = path.resolve(__dirname, "4.0.0.txt");

module.exports = async () => {
    try {

        await fsp.writeFile(
            filePath,
            data
        );

        const asRaw = await fsp.readFile(
            filePath
        ).then(data => data.toString("utf8"));

        const asUtf8 = await fsp.readFile(
            filePath,
            { encoding: "utf8"}
        );

        const asHex = await fsp.readFile(
            filePath,
            { encoding: "hex"}
        ).then(data => Buffer.from(data, "hex").toString("utf8"));

        const asBase64 = await fsp.readFile(
            filePath,
            { encoding: "base64"}
        ).then(data => Buffer.from(data, "base64").toString("utf8"));

        console.log({ asRaw, asUtf8, asHex, asBase64 });
        
        return { asRaw, asUtf8, asHex, asBase64 };

    } catch (error) {
        console.error(error);
    } finally {
        console.log("complete!!!");
    }
}