"use strict";

const doSomething = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("something went wrong!"))
    }, Math.random() * 1000)
});

const makeRequest = (() => {
    let attempts = 0;

    return () => doSomething()
        .catch((error) => {
            attempts += 1;
            if (attempts > 2) {
                throw error;
            } else {
                return doSomething()
            }
        })
})();

(async () => {

    try {
        const response = await makeRequest();
        console.log(response);
    } catch (error) {
        console.error(error)
    }

})()