const {
    PrototypeAnimal,
    ObjectFactoryAnimal,
    ClassAnimal,
} = require("./7.0.0");

describe("prototype inheritance animal", () => {

    it("should return a pig", () => {
        const Pig = new PrototypeAnimal({ type: "pig", color: "pink" })
        expect(Pig.describe()).toMatch(/.*(pink).*(pig)\./)
    })

})

describe("object factory animal", () => {

    it("should return a dog", () => {
        const Dog = ObjectFactoryAnimal({ type: "dog", color: "golden" })
        expect(Dog.describe()).toMatch(/.*(golden).*(dog)\./)
    })

})

describe("class oop animal", () => {

    it("should return a cat", () => {
        const Cat = new ClassAnimal({ type: "cat", color: "black" })
        expect(Cat.describe()).toMatch(/.*(black).*(cat)\./)
    })

})