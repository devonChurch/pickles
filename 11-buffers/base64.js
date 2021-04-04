const fs = require("fs");
const util = require("util");
const path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

(async () => {
    try {
        const iconData = await readFileAsync("./image.png", { encoding: "utf8" });
        const base64Data = Buffer.from(iconData, "utf8").toString("base64");
        const html = `<!doctype html>
<html>
    <head>
        <style>
            body {
                background-image: url("data:image/svg+xml;base64,${base64Data}");
                background-position: center center;
                background-repeat: no-repeat;
                background-color: lightgray;
                height: 100vh;
            }
        </style>
    </head>
    <body>
        <img alt="smile emoji" src="data:image/png;base64,${base64Data}">
    </body>
</html>
        `
        await writeFileAsync("./index.html", html);

    } catch(error) {
        console.error(error);
    }
})();