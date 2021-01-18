console.log(
`path to internal module (fs)
${require.resolve("fs")}
`);

console.log(
`path to external module (1.1.0.js)
${require.resolve("./1.1.0")}
`);

console.log(
`path to NPM module (arg)
${require.resolve("arg")}
`);