console.log("chalk", chalk);
// console.log("fs", fs); // node --require "fs" "./study/1.2.0.js" // does not work =(

fs.promises.readdir(__dirname).then(dirs => console.log("dirs", dirs));