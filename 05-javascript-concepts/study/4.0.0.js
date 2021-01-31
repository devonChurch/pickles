{
    console.log(`\n\nPrototype Inheritance\n`);

    function Boat({ type, size}) {
        this.type = type;
        this.size = size;
        this.setSail = function() {
            return `started sailing a ${this.size} ${this.type} boat`
        }
    }

    Boat.prototype.describe = function() {
        return `this is a ${this.type} boat in a ${this.size} size` 
    }

    function LargeSailBoat() {
        Boat.call(this, { type: "sail", size: "large"});
    }

    LargeSailBoat.prototype = Object.create(Boat.prototype);

    LargeSailBoat.prototype.dock = function() {
        return `docking the ${this.size} ${this.type} boat`
    }

    const SuperSpeedy = new Boat({ type: "motor", size: "small"});
    const FancyYacht = new LargeSailBoat();

    console.log("SuperSpeedy", SuperSpeedy.setSail());
    console.log("SuperSpeedy", SuperSpeedy.describe());
    console.log("- - - ");
    console.log("FancyYacht", FancyYacht.setSail());
    console.log("FancyYacht", FancyYacht.describe());
    console.log("FancyYacht", FancyYacht.dock());
}

{
    console.log(`\n\nObject Factory\n`);

    const createBoat = ({ type, size}) => {
        const Boat = ({
            type, size, 
            setSail() {
                return `started sailing a ${this.size} ${this.type} boat`
            }
        });

        Object.defineProperties(Boat, {
            describe: {
                value() {
                    return `this is a ${this.type} boat in a ${this.size} size`  
                }
            }
        });

        return Boat;
    }

    const createLargeSailBoat = () => {
        const Boat = createBoat({ type: "sail", size: "large" });

        Object.defineProperties(Boat, {
            dock: {
                get() {
                    return `docking the ${this.size} ${this.type} boat`
                }
            }
        });

        return Boat;
    };

    const SuperSpeedy = createBoat({ type: "motor", size: "small"});
    const FancyYacht = createLargeSailBoat();

    console.log("SuperSpeedy", SuperSpeedy.setSail());
    console.log("SuperSpeedy", SuperSpeedy.describe());
    console.log("- - - ");
    console.log("FancyYacht", FancyYacht.setSail());
    console.log("FancyYacht", FancyYacht.describe());
    console.log("FancyYacht", FancyYacht.dock);
}

{
    console.log(`\n\nClases\n`);

    class Boat {
        constructor({ type, size}) {
            this.type = type;
            this.size = size;
        }

        setSail() {
            return `started sailing a ${this.size} ${this.type} boat`
        }

        describe() {
            return `this is a ${this.type} boat in a ${this.size} size` 
        }
    }

    class LargeSailBoat extends Boat {
        constructor() {
            super({ type: "sail", size: "large" });
        }

        get dock() {
            return `docking the ${this.size} ${this.type} boat`
        }
    }

    const SuperSpeedy = new Boat({ type: "motor", size: "small"});
    const FancyYacht = new LargeSailBoat();

    console.log("SuperSpeedy", SuperSpeedy.setSail());
    console.log("SuperSpeedy", SuperSpeedy.describe());
    console.log("- - - ");
    console.log("FancyYacht", FancyYacht.setSail());
    console.log("FancyYacht", FancyYacht.describe());
    console.log("FancyYacht", FancyYacht.dock);
}