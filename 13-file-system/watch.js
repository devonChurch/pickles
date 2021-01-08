const fs = require("fs");
const chokidar = require("chokidar");

{
    fs.watch(__dirname, (event, filename) => {
        console.log("watch:", event, filename); // change file-1.txt
    });

    chokidar.watch(__dirname).on('all', (event, path) => {
        console.log("chokidar:", event, path); // change /Users/devonchurch/Documents/pickles/13-file-system/file-1.txt
      });

    (() => {
        let count = 1;
        let interval;

        interval = setInterval(() => {
            fs.writeFile("./file-1.txt", `\nTime: ${Date.now()}`, { flag: "a" }, () => {
                if (count > 2) {
                    clearInterval(interval);
                } else {
                    count += 1;
                }
            });
        }, 1000)
    })()
}