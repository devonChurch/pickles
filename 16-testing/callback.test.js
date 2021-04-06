const doSomething = (value, callback) => {
    callback(value * value);
}

describe("callback tests", () => {
    

    it("should call the callback function once", () => {

        const callback = jest.fn()
        doSomething(5, callback)

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(25);
    })
})