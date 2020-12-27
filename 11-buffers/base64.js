const fs = require("fs");
const util = require("util")

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

(async () => {
    try {
        const iconData = await readFileAsync("./icon.svg", { encoding: "base64"});
        const html = `<!doctype html>
<html>
    <head>
        <style>
            body {
                background-image: url(data:image/svg+xml;base64,${iconData});
                background-position: center center;
                background-repeat: no-repeat;
                background-color: lightgray;
                height: 100vh;
            }
        </style>
    </head>
    <body>
    </body>
</html>
        `
        writeFileAsync("./index.html", html);

    } catch(error) {
        console.error(error);
    }
})();