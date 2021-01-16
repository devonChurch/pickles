// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

{
    // Vehicles

    function Vehicle(options) {
        this.name = options.name;
        this.size = options.size;
        this.color = options.color;
    }

    Vehicle.prototype.description = function() {
        console.log(`A ${this.size} ${this.name} in a ${this.color} color.`);
    }

    const car = new Vehicle({
        name: "Car",
        size: "Small",
        color: "Silver"
    })

    car.description();

    function Truck() {
        Vehicle.call(this, {
            name: "Truck",
            size: "Large",
            color: "Red"
        });
        this.trailer = true;
    }

    Truck.prototype = Object.create(Vehicle.prototype);

    // Truck.prototype.hasTrailer = function() {
    //     return this.trailer;
    // }

    Object.defineProperty(Truck.prototype, "hasTrailer", {
        get() { return this.trailer; }
    })


    console.log(Object.getOwnPropertyNames(Truck));

    const truck = new Truck();

    truck.description();
    console.log(typeof truck.hasTrailer);
    console.log(truck.hasTrailer);
}

{
    // Animals

    function Animal(options) {
        this.hasWarmBlood = options.hasWarmBlood;
    }

    Animal.prototype.description = function() {
        return `A ${ this.hasWarmBlood ? "warm" : "cold"} blooded animal`;
    }

    function Cat(options) {
        Animal.call(this, { hasWarmBlood: true });
        this.name = options.name;
    }

    Cat.prototype = Object.create(Animal.prototype);

    // Cat.prototype.description = function() {
    //     return `A furry cat named ${this.name}`;
    // }

    Object.defineProperty(Cat.prototype, "description", {
        value: function() { return `A furry cat named ${this.name}`; }
    })

    const lizzard = new Animal({ hasWarmBlood: false});
    const cat = new Cat({ name: "Fred" });

    console.log(lizzard.description());
    console.log(cat.description());
}

{
    // Vechiles

    class Vechile {
        constructor(options) {
            this.size = options.size;
            this.name = options.name;
            this.color = options.color;
        }

        description() {
            return `A ${this.size} ${this.name} in a ${this.color} color`
        }
    }

    class Car extends Vechile {
        constructor(options) {
            super({
                name: "Car",
                size: "Small",
                color: options.color
            })
        }
    }

    class Truck extends Vechile {
        constructor(options) {
            super({
                name: "Truck",
                size: "Large",
                color: options.color
            }),
            this.trailer = options.trailer;
        }

        get hasTrailer() {
            return this.trailer;
        }

        description() {
            return `A ${this.size} ${this.color} ${this.name} ${this.hasTrailer ? "with" : "without"} a trailer`
        }
    }

    const Van = new Vechile({
        name: "Van",
        size: "Medium",
        color: "Green"
    });

    const Integra = new Car({ color: "Silver" });

    const Tanker = new Truck({ color: "Red", trailer: true });

    console.log(Van.description());
    console.log(Integra.description());
    console.log(Tanker.description());
}

{
    // Animals

    debugger;

    const createAnimal = (options) => ({
        ...options,

        description() {
            return `An animal with ${this.totalLegs} legs`
        }   
    });

    const createCat = () => Object.create(
        createAnimal({ totalLegs: 4 }),
        {
            name: { value: "Cat"},
            doSomething: {
                value() {
                   return `The ${this.name} runs with its ${this.totalLegs} legs`
                }
            }
        }
    );

    const Flynn = createCat();

    const Tiger = Object.create(Flynn, { name: { value: "Tiger" } });
    Object.defineProperty(Tiger, "eat", {
        value() { return `The ${this.name} catches and eats its prey` }
    });

    const Monkey = createAnimal({ totalLegs: 2});
    console.log(Monkey.description());

    console.log(Flynn.description());
    console.log(Flynn.doSomething());

    console.log(Tiger.description());
    console.log(Tiger.doSomething());
    console.log(Tiger.eat());
}

{
    // Food
    // Type: Fruit | Vegatable
    // Name: Grapes | Banana | Carrot
    // Skew: xxx | yyy | zzz

    {
        console.log(`\n\n- - - Clasic Prototype Inheritance - - -\n\n`);
        
        function Food(options) {
            this.type = options.type;
            this.skew = options.skew;
        }

        Food.prototype.description = function() {
            return `A ${this.skew ? `${this.skew} ` : ''}${this.type}`;
        }

        const Apple = function(options) {
            Food.call(this, { type: "Apple", skew: options.skew });
            this.color = options.color;
        }

        Apple.prototype = Object.create(Food.prototype);

        Apple.prototype.eat = function() {
            return `Take a bite of a ${this.color} ${this.skew ? `${this.skew} ` : ''}${this.type}`;
        }
        
        const GrannySmith = new Apple({ skew: "Granny Smith", color: "Green"});
        console.log(GrannySmith.description());
        console.log(GrannySmith.eat());

        const Potato = new Food({ type: "Potato"});
        console.log(Potato.description());
    }

    {
        console.log(`\n\n- - - Class Inheritance - - -\n\n`);

        class Food {
            constructor(options) {
                this.type = options.type;
                this.skew = options.skew;
            }

            description() {
                return `A ${this.skew ? `${this.skew} ` : ''}${this.type}`;
            }
        }

        class Apple extends Food {
            constructor({ skew, color}) {
                super({ type: "Apple", skew });
                this.color = color;
            }

            eat() {
                return `Take a bite of a ${this.color} ${this.skew ? `${this.skew} ` : ''}${this.type}`;
            }
        }

        const GrannySmith = new Apple({ skew: "Granny Smith", color: "Green"});
        console.log(GrannySmith.description());
        console.log(GrannySmith.eat());

        const Potato = new Food({ type: "Potato" });
        console.log(Potato.description());
    }

    {
        console.log(`\n\n- - - Object Factory Inheritance - - -\n\n`);

        const createFood = function({ type, skew }) {
            return {
                type,
                skew,
                description() {
                    return `A ${this.skew ? `${this.skew} ` : ''}${this.type}`;
                }
            }
        }

        const createApple = function({ skew, color}) {
            const Instance = Object.create(createFood({ type: "Apple", skew }));
            Object.defineProperties(Instance, {
                color: {
                    value: color
                },
                eat: {
                    value() {
                        return `Take a bite of a ${this.color} ${this.skew ? `${this.skew} ` : ''}${this.type}`;
                    }
                }
            });
            
            return Instance;
        }
        
        const GrannySmith = createApple({ skew: "Granny Smith", color: "Green" });
        console.log(GrannySmith.description());
        console.log(GrannySmith.eat());

        const Potato = createFood({ type: "Potato"});
        console.log(Potato.description());

    }
}