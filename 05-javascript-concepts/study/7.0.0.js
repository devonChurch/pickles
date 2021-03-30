{
    function Animal(options) {
        this.type = options.type;
        this.color = options.color;
    
        this.describe = function() {
            console.log(`this is a ${this.color} ${this.type}.`);
        }
    }
    
    Animal.prototype.something = function() {
        console.log(`this ${this.type} is doing something.`)
    }
    
    function Dog() {
        Animal.call(this, { type: "dog", color: "brown" })
        this.action = "fetch";
    }
    
    Dog.prototype = Object.create(Animal.prototype, {
        something: {
            value: function() {
                console.log(`the ${this.type} is playing ${this.action}.`)
            }
        }
    })
    
    Dog.prototype.eat = function() {
        console.log(`playing ${this.action} has made the ${this.type} hungry.`)
    }
    
    console.log(`\n\n\nPrototype Inheritance:\n`)
    
    const Pig = new Animal({ type: "pig", color: "pink" });
    Pig.describe();
    Pig.something();
    
    const Sam = new Dog();
    Sam.describe();
    Sam.something();
    Sam.eat();
}

{
    const createAnimal = (options) => {

        const animal = Object.create(options, {
            describe: {
                value() {
                    console.log(`this is a ${this.color} ${this.type}.`);
                }
            }
        })
    
        Object.defineProperties(animal, {
            something: {
                writable: true,
                value() {
                    console.log(`this ${this.type} is doing something.`)
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
                    console.log(`the ${this.type} is playing ${this.action}.`)
                }
            },
            eat: {
                value() {
                    console.log(`playing ${this.action} has made the ${this.type} hungry.`)
                }
            }
        })
        
        return dog;
    }
    
    console.log(`\n\n\nObject Factory:\n`)
    
    const pig = createAnimal({
        type: "pig",
        color: "pink"
    })
    pig.describe()
    pig.something()
    
    const dog = createDog();
    dog.describe()
    dog.something()
    dog.eat()
}

{
    class Animal {
        constructor(options) {
            this.type = options.type;
            this.color = options.color;
        }
    
        describe() {
            console.log(`this is a ${this.color} ${this.type}.`);
        }
    
        something() {
            console.log(`this ${this.type} is doing something.`)
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
            console.log(`the ${this.type} is playing ${this.action}.`)
        }
    
        eat() {
            console.log(`playing ${this.action} has made the ${this.type} hungry.`)
        }
    }
    
    console.log(`\n\n\nClass OOP:\n`)
    
    const Pig = new Animal({ type: "pig", color: "pink" });
    Pig.describe();
    Pig.something();
    
    const Sam = new Dog();
    Sam.describe();
    Sam.something();
    Sam.eat();
}