{
    console.log("\n\nPrototype Inheritance")

    function Animal(options) {
        this.name = options.name;
        this.size = options.size;
    }

    Animal.prototype.description = function() {
        return `you spot a ${this.size} ${this.name}`;
    }

    function Cat(options) {
        Animal.call(this, { name: "Cat", size: "fat"});
        this.breed = options.breed;
    }

    Cat.prototype = Object.create(Animal.prototype);

    Cat.prototype.description = function() {
        return `you can see a ${this.size}, ${this.breed} ${this.name}`;
    }

    const Benji = new Animal({ name: "Dog", size: "Big" });
    console.log(Benji.description());

    const Flynn = new Cat({ breed: "ginger" });
    console.log(Flynn.description());
}

{
    console.log("\n\nObject Factory")

    const createAnimal = (options) => {

        const animal = {
            ...options
        }

        Object.defineProperties(animal, {
            description: {
                value() {
                    return `you spot a ${this.size} ${this.name}`;
                }
            }
        });

        return animal;
    }

    const createCat = (options) => {
        const cat = Object.create(createAnimal({ name: "Cat", size: "Fat"}), {
            breed: {
                value: "ginger"
            }
        });

        Object.defineProperties(cat, {
            description: {
                get() {
                    return `you can see a ${this.size}, ${this.breed} ${this.name}`;
                }
            }
        })

        return cat;
    }

    const Benji = createAnimal({ name: "Dog", size: "Big" });
    console.log(Benji.description());

    const Flynn = createCat({ breed: "ginger" });
    console.log(Flynn.description);
}

{
    console.log("\n\nClass OOP")

    class Animal {
        constructor(options) {
            this.name = options.name;
            this.size = options.size;
        }

        description() {
            return `you spot a ${this.size} ${this.name}`;
        }
    }

    class Cat extends Animal {
        constructor(options) {
            super({ name: "Cat", size: "Fat" });
            this.breed = options.breed;
        }

        get description() {
            return `you can see a ${this.size}, ${this.breed} ${this.name}`;
        }
    }

    const Benji = new Animal({ name: "Dog", size: "Big" });
    console.log(Benji.description());

    const Flynn = new Cat({ breed: "ginger" });
    console.log(Flynn.description);
}