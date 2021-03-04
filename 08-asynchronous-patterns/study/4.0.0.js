const util = require("util");

const makeRequest = (response, callback) => {

    setTimeout(() => {
        callback(null, response);
    }, Math.random() * 1000);
};

const makeRequestAsync = util.promisify(makeRequest);

{
    makeRequest("one", (error, responseOne) => {
        if (error) {
            console.error(error)
        } else {
            console.log(responseOne);
            makeRequest("two", (error, responseTwo) => {
                if (error) {
                    console.error(error)
                } else {
                    console.log(responseTwo);
                    makeRequest("three", (error, responseThree) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log(responseThree);
                        }
                    })
                }
            })
        }
    })
}

{
    makeRequestAsync("potato")
        .then(response => {
            console.log(response)
            return makeRequestAsync("banana")
        })
        .then(response => {
            console.log(response)
            return makeRequestAsync("apple")
        })
        .then(response => console.log(response))
        .catch(console.error)
        .finally(() => console.log("DONE!"))
}

{
    Promise.allSettled([
        makeRequestAsync("potato"),
        makeRequestAsync("banana"),
        makeRequestAsync("apple")
    ])
        .then(responses => responses.filter(({ status }) => status === "fulfilled").map(({ value }) => value))
        .then(responses => console.log(responses))
        .catch(console.error)
        .finally(() => console.log("filtered =)"))


}