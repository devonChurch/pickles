const { doSomething, doSomethingAsync } = require("./6.0.0")

test("callback should return response", (done) => {
    doSomething("running", (error, response) => {
        expect(response).toEqual("doing some running");
        done();
    })
})

test("callback should thown an error", (done) => {
    doSomething(undefined, (error, response) => {
        expect(error).toBeInstanceOf(Error);
        done();
    })
})

test("promise should return response", async () => {
    expect(doSomethingAsync("jumping")).resolves.toEqual("doing some jumping")
})

test("promise should throw an error", async () => {
    expect(doSomethingAsync("exciting stuff!")).rejects.toEqual(/more than 10 characters/)
})