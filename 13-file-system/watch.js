const fs = require("fs");

{
    fs.watch(__dirname, (event, filename) => {
        console.log(event, filename); // change file-1.txt
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