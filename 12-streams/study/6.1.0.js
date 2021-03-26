const stream = require("stream");
const fs = require("fs");
const path = require("path");

{
    const writeStream = fs.createWriteStream(
        path.resolve(__dirname, "6.1.0.txt"),
        {
            flag: "a",
            encoding: "utf8"
        }
    );

    stream.pipeline(
        process.stdin,
        writeStream,
        (error) => {
            if (error) {
                console.error(error)
            } else {
                console.log("complete!");
            }
        }
    );
}
