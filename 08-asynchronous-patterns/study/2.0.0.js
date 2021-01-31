const util = require("util");

{
    const asyncRequest = (shouldReject) => (response) => new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) { reject(new Error("Sorry, there has been an error")) }
            else { resolve(response) }
        }, Math.random() * 1000);
    });
    
    const doSomeThing = asyncRequest(false);
    
    (async () => {
        const name = await doSomeThing("Devon");
        console.log("name", name);
    })()
}


{
    const asyncRequest = (shouldReject) => (response, callback) => {
        setTimeout(() => { 
            if (shouldReject) { callback(new Error("Sorry, there was an error"), null) }
            else ( callback(null, response))
        }, 1000)
    }

    const doSomeThing = asyncRequest(false);
    const name = doSomeThing("Devon", (error, response) => {
        if (error) {
            console.error(error)
        } else {
            console.log("name", response);
        }
    });

    const doSomeThingElse = util.promisify(doSomeThing)
    doSomeThingElse("Ashton")
        .then(response => console.log("name", response))
        .then(() => doSomeThingElse("Sheldon"))
        .then(response => console.log("name", response))
        .catch(console.error);

    const doSomeThingWrong = util.promisify(asyncRequest(true));

    Promise.all([
        doSomeThingElse("One"),
        doSomeThingElse("Two"),
        doSomeThingElse("Three")
    ]).then(responses => console.log("all", responses));
    
    Promise.race([
        doSomeThingElse("One"),
        doSomeThingElse("Two"),
        doSomeThingElse("Three")
    ]).then(response => console.log("race", response));

    Promise.allSettled([
        doSomeThingElse("One"),
        doSomeThingWrong("Two"),
        doSomeThingElse("Three")
    ]).then(responses => console.log("all settled", responses));
}