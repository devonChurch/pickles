const Animal = class {
    constructor(name = "Mamal") {
        this.name = name;
    }
    eat() {
        return `${this.name} is eating`;
    }
}

const Dog = class extends Animal {
    constructor({ name, ...props}) {
        super(name);
        Object.entries(props).forEach(([ key, value ]) => {
            this[key] = value;
        })
    }
    speak() {
        return `${this.name} says woof`;
    }
    metrics() {
        return `${this.name} is ${this.height} tall and ${this.weight} in size`;
    }
}

const Spike = new Dog({ name: "Spike", height: "1.1m", weight: "31.3kg" });
console.log(Spike.eat());
console.log(Spike.speak());
console.log(Spike.metrics());

const Daisy = new (class extends Dog {
    constructor(props) {
        super(props);
    }
    run() {
        return `${this.name} is running `;
    }
})({ name: "Daisy", height: "90cm", weight: "22.1kg" });

console.log(Daisy.eat());
console.log(Daisy.speak());
console.log(Daisy.metrics());
console.log(Daisy.run());