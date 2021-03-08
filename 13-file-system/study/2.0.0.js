const chokidar = require('chokidar');
const fs = require("fs");
const path = require("path");
const util = require("util");
const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);
const rmdirAsync = util.promisify(fs.rmdir);
const unlinkAsync = util.promisify(fs.unlink);

// One-liner for current directory
chokidar.watch(__dirname).on('all', (event, path) => {
  console.log(event, path);
});



fs.mkdir(
    path.resolve(__dirname, "2-0-0"),
    (error) => {
        if (error) {
            console.error(error);
        } else {
            fs.writeFile(path.resolve(__dirname, "2-0-0", "foo.txt"), "F O O", { encoding: "utf8"}, (error) => {
                if (error) {
                    console.error(error)
                } else {
                    mkdirAsync(
                        path.resolve(__dirname, "2-0-0", "foo")
                    ).then(
                        () => writeFileAsync(
                            path.resolve(__dirname, "2-0-0", "foo", "bar.txt"), "B A R", { encoding: "utf8" }
                        )
                    ).then(
                        rmdirAsync(path.resolve(__dirname, "2-0-0"), { recursive: true})
                    )
                }
            })
        }
    }
)
