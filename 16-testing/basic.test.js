const buffer = require("buffer");

const add = (num1, num2) => num1 + num2;

test("it should add two numbers", () => {
    expect(add(1, 3)).toBe(4);
});

test("it should deep equal an object", () => {
    const obj1 = { foo: { bar: { baz: "FOO-BAR-BAZ"}}};
    const obj2 = { foo: { bar: { baz: "FOO-BAR-BAZ"}}};

    expect(obj1).toStrictEqual(obj2);
});

const callFunc = (myFunc, calls) => {
    for(let index = 0; index < calls; index += 1) {
        myFunc();
    } 
}

test("it should count the function calls",  () => {
    const callback = jest.fn(() => {});
    callFunc(callback, 5);

    expect(callback.mock.calls.length).toBe(5);
});

const sendRequest = (response) => new Promise((resolve) => setTimeout(() => {
    resolve(response);
}, 1000))

test("it should wait for a response", async () => {
    const response = await sendRequest("potato");
    expect(response).toBe("potato");
});

const throwAnError = () => {
    throw new Error("broken!");
}

test("it should throw an error", () => {
    const callFunc = () => throwAnError();

    expect(callFunc).toThrowError(/.*!/);
})

const rejection = () => new Promise((resolve, reject) => setTimeout(() => reject(new Error("sorry")), 1000))

test("it should reject", async () => {
    await expect(rejection()).rejects.toThrowError(/sorry/);
});

const createBuffer = () => Buffer.from("apple", "utf8");

test("is should be a buffer", () => {
    expect(Buffer.isBuffer(createBuffer())).toBeTruthy();
})