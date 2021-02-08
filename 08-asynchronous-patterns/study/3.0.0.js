const util = require("util");

const myFunction = (value, callback) => {
    setTimeout(() => {
        const shouldError = Math.random() > 0.5;
        if (shouldError) {
            callback(new Error("IT BLEW UP!!!"));
        } else {
            callback(null, `DONE | ${value}`);
        }
    }, 200)
};

const myFunctionAsync = util.promisify(myFunction);

{
    myFunction("one", (error1, value1) => {
        if (error1) {
            console.log(error1)
        } else {
            myFunction(`${value1} | two`, (error2, value2) => {
                if (error2) {
                    console.log(error2)
                } else {
                    myFunction(`${value2} | three`, (error3, value3) => {
                        if (error3) {
                            console.log(error3);
                        } else {
                            console.log("callback pyramid", value3);
                        }
                    })
                }
            })
        }
    })
}

{
    myFunctionAsync("one")
        .then(value => myFunctionAsync(`${value} | two`))
        .then(value => myFunctionAsync(`${value} | three`))
        .then(value => console.log("promise chain", value))
        .catch(error => console.error(error))
}

(async () => {
    try {
        const value1 = await myFunctionAsync("one")
        const value2 = await myFunctionAsync(`${value1} | two`)
        const value3 = await myFunctionAsync(`${value2} | three`)

        console.log("async/await", value3);
    } catch (error) {
        console.error(error)
    }
})();

{
    Promise.all([
        myFunctionAsync("one"),
        myFunctionAsync("two"),
        myFunctionAsync("three"),
    ]).then(values => console.log("all", values.join(" | ")))
    .catch(error => console.error(error))
}

{
    Promise.allSettled([
        myFunctionAsync("one"),
        myFunctionAsync("two"),
        myFunctionAsync("three"),
    ]).then(values => {
        console.log(
            "allSettled",
            values
                .filter(({ status }) => status === "fulfilled")
                .map(({ value}) => value)
                .join(" | ")
        )
    })
    .catch(error => console.error(error))
}