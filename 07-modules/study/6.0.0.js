{
  console.log("fs", require.resolve("fs"));
  console.log("arg", require.resolve("arg"));
  console.log(__filename, require.resolve(__filename));
}

{
  const isFromCli = require.main === module;

  if (isFromCli) {
    console.log("running from cli", process.argv);
    const args = process.argv
      .map((arg) => arg.split("="))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key.replace(/^--/, "")]: value,
      }));
    console.log(`\n\nhello ${args.name}\n\n`);
  } else {
    console.log("running as imported module");
    module.exports = (name) => {
      console.log(`\n\nhello ${name}\n\n`);
    };
  }
}
