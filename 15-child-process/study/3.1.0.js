"use strict";

const fsp = require("fs").promises;

fsp.readdir(process.cwd()).then(items => process.stderr.write("potato") && process.stdout.write(items.join("\n")));

