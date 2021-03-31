module.exports.PrototypeAnimal = (() => {
    function Animal(options) {
        this.type = options.type;
        this.color = options.color;
    
        this.describe = function() {
            return(`this is a ${this.color} ${this.type}.`);
        }
    }
    
    Animal.prototype.something = function() {
        return(`this ${this.type} is doing something.`)
    }
    
    function Dog() {
        Animal.call(this, { type: "dog", color: "brown" })
        this.action = "fetch";
    }
    
    Dog.prototype = Object.create(Animal.prototype, {
        something: {
            value: function() {
                return(`the ${this.type} is playing ${this.action}.`)
            }
        }
    })
    
    Dog.prototype.eat = function() {
        return(`playing ${this.action} has made the ${this.type} hungry.`)
    }

    return Animal;

    
//     console.log(`\n\n\nPrototype Inheritance:\n`)
    
//     const Pig = new Animal({ type: "pig", color: "pink" });
//     Pig.describe();
//     Pig.something();
    
//     const Sam = new Dog();
//     Sam.describe();
//     Sam.something();
//     Sam.eat();
})()

module.exports.ObjectFactoryAnimal = (() => {
    const createAnimal = (options) => {

        const animal = Object.create(options, {
            describe: {
                value() {
                    return(`this is a ${this.color} ${this.type}.`);
                }
            }
        })
    
        Object.defineProperties(animal, {
            something: {
                writable: true,
                value() {
                    return(`this ${this.type} is doing something.`)
                }
            }
        })
    
        return animal;
    }
    
    const createDog = () => {
    
        const dog = createAnimal({
            type: "dog",
            color: "brown"
        });
    
        Object.defineProperties(dog, {
            action: {
                value: "fetch"
            },
            something: {
                value() {
                    return(`the ${this.type} is playing ${this.action}.`)
                }
            },
            eat: {
                value() {
                    return(`playing ${this.action} has made the ${this.type} hungry.`)
                }
            }
        })
        
        return dog;
    }

    return createAnimal
    
//     console.log(`\n\n\nObject Factory:\n`)
    
//     const pig = createAnimal({
//         type: "pig",
//         color: "pink"
//     })
//     pig.describe()
//     pig.something()
    
//     const dog = createDog();
//     dog.describe()
//     dog.something()
//     dog.eat()
})();

module.exports.ClassAnimal = (() => {
    class Animal {
        constructor(options) {
            this.type = options.type;
            this.color = options.color;
        }
    
        describe() {
            return(`this is a ${this.color} ${this.type}.`);
        }
    
        something() {
            return(`this ${this.type} is doing something.`)
        }
    }
    
    class Dog extends Animal {
        constructor() {
            super({
                type: "dog",
                color: "brown"
            })
            this.action = "fetch"
        }
    
        something() {
            return(`the ${this.type} is playing ${this.action}.`)
        }
    
        eat() {
            return(`playing ${this.action} has made the ${this.type} hungry.`)
        }
    }

    return Animal;
    
//     console.log(`\n\n\nClass OOP:\n`)
    
//     const Pig = new Animal({ type: "pig", color: "pink" });
//     Pig.describe();
//     Pig.something();
    
//     const Sam = new Dog();
//     Sam.describe();
//     Sam.something();
//     Sam.eat();
})();