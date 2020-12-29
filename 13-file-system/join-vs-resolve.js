const path = require("path");

console.log({
    join:  path.join("/a", "b", "/c"),
    resolve:  path.resolve("/a", "b", "/c"),
    normalize: path.normalize("./foo/../foo/bar//baz/."),
    relative: path.relative("./foo/bar/baz", "./foo/zap/zoop.js"),
    sep: path.sep,
    // 
    isAbsolute: path.isAbsolute("/foo/bar"),
    notAbsolute: path.isAbsolute("./foo/bar"),
    //
    parse: path.parse("/foo/bar/baz.js"),
    format: path.format(path.parse("foo/bar/baz.js"))
});
