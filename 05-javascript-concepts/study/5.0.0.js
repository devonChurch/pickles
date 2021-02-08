{
    // Prototype Inheritance

    function Color({ red, green, blue }) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    Color.prototype.breakdown = function() {
        return {
            r: this.red,
            g: this.green,
            b: this.blue
        }
    }

    function MetalicColor(options) {
        Color.call(this, options);
        this.isMetalic = true;
    }

    MetalicColor.prototype = Object.create(Color.prototype);

    MetalicColor.prototype.describe = function() {
        return `this ${this.isMetalic ? "metalic" : "standard"} color has a color breakdown of ${JSON.stringify(this.breakdown(), null, 2)}`;
    }

    const Purple = new Color({ red: 200, green: 0, blue: 190 });
    console.log(Purple.breakdown());

    const MetalicOrange = new MetalicColor({ red: 255, green: 150, blue: 150 });
    console.log(MetalicOrange.breakdown());
    console.log(MetalicOrange.describe());
}

{
    // Object Factory

    createColor = (options) => {
        const color = ({
            ...options,
        });

        Object.defineProperties(color, {
            breakdown: {
                value() {
                    return {
                        r: this.red,
                        g: this.green,
                        b: this.blue
                    }
                }
            }
        });

        return color;
    };

    createMetalicColor = (options) => {
        const color = Object.create(createColor(options), {
            isMetalic: {
                value: true
            }
        });

        Object.defineProperties(color, { 
            describe: {
                get() {
                    return `this ${this.isMetalic ? "metalic" : "standard"} color has a color breakdown of ${JSON.stringify(this.breakdown(), null, 2)}`;
                }
            }
        });

        return color;
    };

    const Purple = createColor({ red: 200, green: 0, blue: 190 });
    console.log(Purple.breakdown());

    const MetalicOrange = createMetalicColor({ red: 255, green: 150, blue: 150 });
    console.log(MetalicOrange.breakdown());
    console.log(MetalicOrange.describe);
}

{
    // Class Extension

    class Color {
        constructor({ red, green, blue }) {
            this.red = red;
            this.green = green;
            this.blue = blue;
        }

        breakdown() {
            return {
                r: this.red,
                g: this.green,
                b: this.blue
            }
        }
    }

    class MetalicColor extends Color {
        constructor(options) {
            super(options);
            this.isMetalic = true;
        }

        get describe() {
            return `this ${this.isMetalic ? "metalic" : "standard"} color has a color breakdown of ${JSON.stringify(this.breakdown(), null, 2)}`;
        }
    }

    const Purple = new Color({ red: 200, green: 0, blue: 190 });
    console.log(Purple.breakdown());

    const MetalicOrange = new MetalicColor({ red: 255, green: 150, blue: 150 });
    console.log(MetalicOrange.breakdown());
    console.log(MetalicOrange.describe);
}