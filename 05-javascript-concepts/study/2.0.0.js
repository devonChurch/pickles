{
    console.log(`\n\n\n- - - Object Factory - - -\n`);
    
    const createPerson = (options) => ({
        ...options,
        sayHello() {
            return `Hi, my name is ${this.name} and I am ${this.age} ${this.age === 1 ? "year" : "years"} old`
        }
    });

    const createAdult = (options) => {
        const Adult = Object.create(createPerson(options), {
            isAdult: {
                get() { return this.age > 18 }
            }
        });
        return Adult;
    };

    const createFather = ({ name, age, children }) => {
        const Father = Object.create(createAdult({ name, age}))
        Object.defineProperties(Father, {
            children: {
                value: children
            },
            totalChildren: {
                value() {
                    return `I have ${this.children} ${this.children === 1 ? "child" : "children"}`
                }
            }
        });
        return Father;
    };

    const Sarah = createPerson({
        name: "Sarah",
        age: 1
    });

    console.log(Sarah.sayHello());

    const John = createFather({
        name: "John",
        age: 34,
        children: 2
    });

    console.log(John.sayHello());
    console.log(John.isAdult);
    console.log(John.totalChildren());

    const Peter = createFather({
        name: "Peter",
        age: 17,
        children: 1
    });

    console.log(Peter.sayHello());
    console.log(Peter.isAdult);
    console.log(Peter.totalChildren());
}

{
    console.log(`\n\n\n- - - Classic Prototype Inheritance - - -\n`);

    function Person(options) {
        this.name = options.name;
        this.age = options.age;
    }

    Person.prototype.sayHello = function() {
        return `Hi, my name is ${this.name} and I am ${this.age} ${this.age === 1 ? "year" : "years"} old`
    }

    function Adult(options) {
        Person.call(this, options)
    }

    Adult.prototype = Object.create(Person.prototype);

    Adult.prototype.isAdult = function() {
        return this.age > 18
    }

    function Father({ name, age, children }) {
        Adult.call(this, { name, age });
        this.children = children;
    }

    Father.prototype = Object.create(Adult.prototype);

    Father.prototype.totalChildren = function() {
        return `I have ${this.children} ${this.children === 1 ? "child" : "children"}`
    }

    const Sarah = new Person({
        name: "Sarah",
        age: 1
    });

    console.log(Sarah.sayHello());
    
    const John = new Father({
        name: "John",
        age: 34,
        children: 2
    });
    
    console.log(John.sayHello());
    console.log(John.isAdult());
    console.log(John.totalChildren());
    
    const Peter = new Father({
        name: "Peter",
        age: 17,
        children: 1
    });
    
    console.log(Peter.sayHello());
    console.log(Peter.isAdult());
    console.log(Peter.totalChildren());
}

{
    console.log(`\n\n\n- - - Class Inheritance - - -\n`);

    class Person {
        constructor({ name, age}) {
            this.name = name;
            this.age = age;
        }
        sayHello() {
            return `Hi, my name is ${this.name} and I am ${this.age} ${this.age === 1 ? "year" : "years"} old`
        }
    }

    class Adult extends Person {
        constructor(options) {
            super(options);
        }
        get isAdult() {
            return this.age > 18;
        }
    }

    class Father extends Adult {
        constructor({ name, age, children }) {
            super({ name, age });
            this.children = children;
        }
        totalChildren() {
            return `I have ${this.children} ${this.children === 1 ? "child" : "children"}`
        }
    }

    const Sarah = new Person({
        name: "Sarah",
        age: 1
    });

    console.log(Sarah.sayHello());
    
    const John = new Father({
        name: "John",
        age: 34,
        children: 2
    });
    
    console.log(John.sayHello());
    console.log(John.isAdult);
    console.log(John.totalChildren());
    
    const Peter = new Father({
        name: "Peter",
        age: 17,
        children: 1
    });
    
    console.log(Peter.sayHello());
    console.log(Peter.isAdult);
    console.log(Peter.totalChildren());
}


{
    function Person(options) {
        this.name = options.name;
      }
      
      Person.prototype.sayHello = function() {
        return `Hello, my name is ${this.name}`
      }
      
      function Adult({ name, job }) {
        Person.call(this, { name });
        this.job = job
      }
      
      Adult.prototype = Object.create(Person.prototype);
      
      Adult.prototype.myJob = function() {
        return `My job is ${this.job}` 
      }

      const Sam = new Adult({
          name: "Sam",
          job: "Teacher"
      })

      console.log(Sam.sayHello());
      console.log(Sam.myJob());
}