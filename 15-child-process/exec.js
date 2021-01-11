const childProcess = require("child_process");
const util = require("util");
const execAsync = util.promisify(childProcess.exec);

{
    execAsync(`node -e "console.log('hello world')"`)
        .then(console.log)
        .catch(console.error)
}

{
    execAsync(`node --version`)
        .then(console.log)
        .catch(console.error)
}

{
    execAsync(`${process.execPath} -p "process.env.NODE_ENV || 'development'"`)
        .then(({ stdout}) => console.log(`Node environment = ${stdout}`))
        .catch(console.error);
}

{
    execAsync(`echo "hello world"`)
        .then(console.log)
        .catch(console.error)
}

{
    execAsync(`${process.execPath} -e "process.exit(1)"`)
        .then(console.log)
        .catch(console.error)
}

{
    execAsync(`${process.execPath} -e "throw new Error('something is potato')"`)
        .then(console.log)
        .catch(console.error)
}

{
    childProcess.exec(`echo "banana"`, (error, response) => {
        if (error) {
            console.error(error);
        } else {
            console.log(response);
        }
    });
}

{
    try {
        const response = childProcess.execSync(`echo "apple"`);
        console.log(response.toString("utf8"));
    } catch (error) {
        console.error(error)
    }
}

{
    try {
        const response = childProcess.execSync(`${process.execPath} -e "process.exit(1)"`);
        console.log(response.toString("utf8"));
    } catch (error) {
        console.error(error)
    }
}