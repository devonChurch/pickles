const {
    getAreaOfSquare,
getAreaOfSquareAsync
} = require("./6.0.0.js");

it("should return the area", (done) => {
    getAreaOfSquare(3, (error, area) => {
        expect(area).toEqual(9)
        done()
    })
})

it("should throw an error", (done) => {
    getAreaOfSquare("three", (error) => {
        expect(error).toBeInstanceOf(TypeError)
        done()
    });
})

it("should return the area", () => {
    expect(getAreaOfSquareAsync(5)).resolves.toEqual(25)
})

it("should throw an error", () => {
    expect(getAreaOfSquareAsync("five")).rejects.toBeInstanceOf(TypeError)
})