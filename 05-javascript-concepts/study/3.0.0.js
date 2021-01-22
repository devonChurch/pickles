{
    function Dog(options) {
        this.name = options.name;
        this.age = options.age;
    }

    Dog.prototype.greet = function() {
        return `${this.name} says hello!`
    }

    function LargeDog(options) {
        Dog.call(this, options);
        this.size = "Large";
    }

    LargeDog.prototype = Object.create(Dog.prototype);

    LargeDog.prototype.about = function() {
        return `A ${this.age} year old ${this.size} dog`;
    }

    const Sam = new LargeDog({
        name: "Sam",
        age: 3,
    });
    console.log(Sam.greet());
    console.log(Sam.about());
}

{
    const createDog = (options) => ({
        ...options,
        greet() {
            return `${this.name} says hello!`
        }
    });

    const createLargeDog = (options) => {
        const LargeDog = Object.create(createDog(options), {
            size: {
                value: "Large"
            },
        });

        Object.defineProperties(LargeDog, {
            about: {
                get() {
                    return `A ${this.age} year old ${this.size} dog`;
                }
            }
        });

        return LargeDog;
    };

    const Sam = createLargeDog({ name: "Sam", age: 3 });
    console.log(Sam.greet());
    console.log(Sam.about);
}

{
    class Dog {
        constructor(options) {
            this.name = options.name;
            this.age = options.age;
        }
        greet() {
            return `${this.name} says hello!`
        }
    }

    class LargeDog extends Dog {
        constructor(options) {
            super(options);
            this.size = "Large";
        }
        get about() {
            return `A ${this.age} year old ${this.size} dog`;
        }
    }

    const Sam = new LargeDog({
        name: "Sam",
        age: 3,
    });
    console.log(Sam.greet());
    console.log(Sam.about);
}