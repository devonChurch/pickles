

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object-oriented_JavaScript
{
    function Shape(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
      }
      
      // Write your code below here
      
      Shape.prototype.calcPerimeter = function() {
        return this.sides * this.sideLength;
      }
      
      const Square = new Shape("square", 4, 5);
      
      console.log("Prototype | Square", Square.calcPerimeter());
      
      const Triangle = new Shape("triangle", 3, 3)
      
      console.log("Prototype | Triangle", Triangle.calcPerimeter())
          
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object-oriented_JavaScript
{
    class Shape {
        constructor(name, sides, sideLength) {
            this.name = name;
            this.sides = sides;
            this.sideLength = sideLength;
        }

        calcPerimeter() {
            return this.sides * this.sideLength;
        }
    }

    const Square = new Shape("square", 4, 5);

    console.log("Class | Square", Square.calcPerimeter());
    
    const Triangle = new Shape("triange", 3, 3);

    console.log("Class | Triangle", Triangle.calcPerimeter());
}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object-oriented_JavaScript
{
    class Shape {
        constructor(name, sides, sideLength) {
            this.name = name;
            this.sides = sides;
            this.sideLength = sideLength;
        }

        calcPerimeter() {
            return this.sides * this.sideLength;
        }
    }

    class Square extends Shape {
        constructor(sideLength) {
            super("square", 4, sideLength)
        }

        calcArea() {
            return this.sideLength * this.sideLength;
        }
    }

    const MySquare = new Square(10);

    // console.log(MySquare);
    // delete MySquare.sideLength;    
    // console.log(MySquare);

    console.log("Class inheritance | Square", {
        perimeter: MySquare.calcPerimeter(),
        area: MySquare.calcArea()
    });
}