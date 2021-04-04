class Person {
    constructor(traits) {
        if (!traits.height) {
            throw new Error("height is required");
        } else if (!traits.weight) {
            throw new Error("weight is required");
        }
    }

    describe() {
        return `this person is ${this.height}cm tall and weighs ${this.weight}kg.`
    }
}

module.exports = Person;

// const Devon = new Person({
//     height: 170,
//     weight: 53
// });

// console.log(Devon.describe());

// const Sarah = new Person({
//     height: 180
// })

// console.log(Sarah.describe());