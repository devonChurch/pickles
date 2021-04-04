console.log("\n\n\nprototype inheritance\n");
{
    function Vehicle(options) {
        this.wheels = options.wheels;
        this.seats = options.seats;
    }
    
    Vehicle.prototype.specs = function() {
        return `a vehicle with ${this.wheels} wheels and ${this.seats} seats.`
    }
    
    function Van() {
        Vehicle.call(this, { wheels: 4, seats: 7 });
        this.name = "van";
    }
    
    Van.prototype = Object.create(Vehicle.prototype);
    
    Van.prototype.drive = function() {
        return `the ${this.name} is driving.`
    }

    
    const Bike = new Vehicle({ wheels: 2, seats: 1 });
    // delete Bike.wheels;
    // delete Bike.prototype.specs;
    process.stdout.write(Bike.specs() + "\n");
    
    const Shuttle = new Van();
    process.stdout.write(Shuttle.specs() + "\n");
    process.stdout.write(Shuttle.drive() + "\n");
}

console.log("\n\n\nobject factory\n");
{
    const createVehicle = (options) => {
        const vehicle = Object.create({}, {
            wheels: { value: options.wheels},
            seats: { value: options.seats },
            specs: {
                value() {
                    return `a vehicle with ${this.wheels} wheels and ${this.seats} seats.`
                }
            }
        });

        return vehicle;
    }

    const createVan = () => {
        const van = Object.create(createVehicle({
            wheels: 4, seats: 7
        }), {
            name: { value: "van"}
        })

        Object.defineProperties(van, {
            drive: {
                value() {
                    return `the ${this.name} is driving.`
                }
            }
        });

        return van;
    }

    const bike = createVehicle({ wheels: 2, seats: 1 });
    process.stdout.write(bike.specs() + "\n");
    
    const shuttle = createVan();
    process.stdout.write(shuttle.specs() + "\n");
    process.stdout.write(shuttle.drive() + "\n");

}

console.log("\n\n\nclass oop\n");
{
    class Vehicle {
        constructor(options) {
            this.wheels = options.wheels;
            this.seats = options.seats;
        }

        specs() {
            return `a vehicle with ${this.wheels} wheels and ${this.seats} seats.`
        }
    }

    class Van extends Vehicle {
        constructor() {
            super({
                wheels: 4,
                seats: 7
            })
            this.name = "van"
        }

        drive() {
            return `the ${this.name} is driving.`
        }
    }

    const Bike = new Vehicle({ wheels: 2, seats: 1 });
    // delete Bike.wheels;
    // delete Bike.prototype.specs;
    process.stdout.write(Bike.specs() + "\n")
    
    const Shuttle = new Van()

    

    // console.log({ Vehicle }, Vehicle.prototype);
    // console.log({ Van }, Van.prototype);
    // console.log({ Shuttle }, Shuttle.prototype);
    process.stdout.write(Shuttle.specs() + "\n")
    process.stdout.write(Shuttle.drive() + "\n")

}