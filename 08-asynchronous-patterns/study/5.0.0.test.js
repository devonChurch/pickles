const {
    makeCallbackRequest,
    makeAsyncRequest
} = require("./5.0.0")

it("should return 16", (done) => {
    makeCallbackRequest(4, (error, response) => {
        expect(response).toEqual(16);
        done()
    })
})

it("should throw error with passing 5 as an parameter", (done) => {
    makeCallbackRequest(5, (error, response) => {
        expect(error).toBeInstanceOf(Error);
        done()
    })
})

it("should return 9", () => {
    expect(makeAsyncRequest(3)).resolves.toEqual(9)
})

it("should throw error when passing 0 as a parameter", () => {
    expect(makeAsyncRequest(0)).rejects.toThrowError(/must be a positive number/)
})

it("should return 4", async () => {
    expect((async () => {

        await makeAsyncRequest(2);
        // make a bunch more request + processing etc....

    })()).resolves.toEqual(4)
})

it("should throw an error when passing 5 a parameter", async () => {
    expect((async () => {

        return await makeAsyncRequest(2);

    })()).rejects.toThrowError(/cannot be 5/)
})