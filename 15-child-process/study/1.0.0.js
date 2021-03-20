const childProcess = require("child_process");
const fs = require("fs");
const path = require("path")
const util = require("util")
const execAsync = util.promisify(childProcess.exec);


{
    try {
        const response = childProcess.execSync(`ls ${__dirname} && node -e "console.error('broken!')"`);
        console.log(response.toString());
    } catch(error) {
        process.stderr.write(error + "\n")
    }
}

{
    console.log("process.execPath", process.execPath);
    
    try {
        const response = childProcess.execSync(`${process.execPath} -p "JSON.stringify(fs.readdirSync(path.join('${__dirname}', '../'), { encoding: 'utf8' }))"`)
        console.log(response.toString());
    } catch (error) {
        process.stderr.write(error + "\n");
    }

    // fs.readdir(path.join(__dirname, "../"), { encoding: 'utf8' }, (error, response) => {
    //     if (error) {
    //         process.stderr.write(error + "\n")
    //     } else {
    //         process.stdout.write(response + "\n")
    //     }
    // })

    // const dirs = JSON.stringify(fs.readdirSync(path.join(__dirname, "../"), { encoding: 'utf8' }))
    // console.log(dirs);
}

{
    try {
        childProcess.execSync(`${process.execPath} -e "throw new Error('its broken!')"`)
    } catch (error) {
        process.stderr.write(error + "\n")
    }
}

{
    childProcess.exec(`${process.execPath} -e "console.log('hello world'); console.error('broken code!')"`, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log(stdout, stderr);
        }
    })
}

{
    childProcess.exec(`${process.execPath} -e "throw new Error('it blew up!!!!')"`, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
        } else {
            console.log(stdout, stderr);
        }
    })
}

{
    execAsync(`${process.execPath} -p "fs.statSync('${__filename}')"`)
        .then((stdout, stderr) => {
            console.log(
                stdout,
                stderr,
            )
        })
        .catch(error => console.error(error))
}