const childProcess = require("child_process");
const path = require("path")
const fsp = require("fs/promises");

test("basic", () => {
    expect(1 + 2).toEqual(3)
})

test("async/await", async () => {
    const request = () => new Promise(resolve => setTimeout(() => resolve("potato"), 1000));
    await expect(request()).resolves.toEqual("potato")
})

test("callback", (done) => {
    const request = (callback) => setTimeout(() => callback("potato"), 1000);
    const assert = (response) => {
        expect(response).toEqual("potato");
        done();
    }
    request(assert)
})

test("sync error", () => {
    const request = () => {
        throw new Error("it's broken!")
    }
    expect(() => request()).toThrow(/broken!/)
})

test("async error", async () => {
    const request = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error("it's broken!")), 1000));
    await expect(request()).rejects.toThrow(/broken!/)
})

test("mock function", () => {
    const request = (value) => value * 2;
    const mockedRequest = jest.fn(request);
    const response = mockedRequest(5);

    expect(mockedRequest.mock.calls[0][0]).toEqual(5);
    expect(mockedRequest.mock.results[0].value).toEqual(10);
    expect(mockedRequest.mock.instances.length).toEqual(1);
})

test("stdout is piped to external file", async () => {
    await childProcess.exec(`${process.execPath} study/6.0.0.js | ${process.execPath} study/6.1.0.js`);
    const data = await fsp.readFile(
        path.resolve(__dirname, "6.1.0.txt"),
        { encoding: "utf8"}
    );
    expect(data.trim().split("\n")).toEqual(["one", "two", "three", "four"]);
});
