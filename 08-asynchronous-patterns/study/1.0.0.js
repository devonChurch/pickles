const util = require("util");

const createCallback = (value, isError) => (callback) => {
    setTimeout(() => {
        callback(
            isError ? value : null,
            isError ? undefined : value
        )
    }, Math.random()* 100)
}

const createPromise = (value, isError) => () => new Promise((resolve, reject) => {
    if (isError) {
        reject(value)
    } else {
        resolve(value);
    }
});

{
    // Callback (Watterfall)

    const callback1 = createCallback("one")
    const callback2 = createCallback("two")
    const callback3 = createCallback("three")
    const callback4 = createCallback("four")
    // callback4 = createCallback("Sorry, there has been an error (waterfall)", true)

    callback1((error, response1) => {
        if (error) {
            console.error(error)
        } else {
            callback2((error, response2) => {
                if (error) {
                    console.error(error)
                } else {
                    callback3((error, response3) => {
                        if (error) {
                            console.error(error)
                        } else {
                            callback4((error, response4) => {
                                if (error) {
                                    console.error(error)
                                } else {
                                    console.log("got responses (waterfall)", [
                                        response1, response2, response3, response4
                                    ]);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

{
    // Callback (Parallel)

    const callback1 = util.promisify(createCallback("one"));
    const callback2 = util.promisify(createCallback("two"));
    const callback3 = util.promisify(createCallback("three"));
    const callback4 = util.promisify(createCallback("four"));
    // const callback4 = util.promisify(createCallback("Sorry, there has been an error (parallel)", true));

    Promise.all([callback1(), callback2(), callback3(), callback4()])
    // Promise.allSettled([callback1(), callback2(), callback3(), callback4()])
    // Promise.race([callback1(), callback2(), callback3(), callback4()])
        .then(responses => console.log("got responses (parallel)", responses))
        .catch(console.error)
        .finally(() => console.log("complete! (parallel)"))
}

(async () => {
    // Callback (Async/Await Waterfall)

    const callback1 = util.promisify(createCallback("one"));
    const callback2 = util.promisify(createCallback("two"));
    const callback3 = util.promisify(createCallback("three"));
    const callback4 = util.promisify(createCallback("four"));
    // const callback4 = util.promisify(createCallback("Sorry, there has been an error (Async/Await Waterfall)", true));

    try {
    const response1 = await callback1();
    const response2 = await callback2();
    const response3 = await callback3();
    const response4 = await callback4();

    console.log("got responses (Async/Await Waterfall)", [
        response1,
        response2,
        response3,
        response4,
    ])
    } catch(error) {
        console.error(error)
    }
})()