const Person = require("./7.0.0")

describe("person duck testing", () => {

    it("should require height", () => {
        expect(() => new Person({ weight: 64})).toThrowError(/height/)
    })

    it("should require weight", () => {
        expect(() => new Person({ height: 192})).toThrowError(/weight/)
    })

    it("should describe a person", () => {
        expect(new Person({ height: 181, weight: 83 })).toBeInstanceOf(Person)
    })

})