const stream = require("stream");
const util = require("util");
const pipelineAsync = util.promisify(stream.pipeline);

{
  const items = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const myStream = new stream.Readable({
    objectMode: true,
    // encoding: "utf8",
    read() {
      const item = items.shift();
      this.push(item || null);
    },
  });

  myStream.on("data", (data) => console.log("\ndata", data));

  myStream.pipe(process.stdout);
}

{
  const myReadable = stream.Readable({
    objectMode: true,
    read() {},
  });

  const myTransform = new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      console.log("transform | chunk", chunk);
      callback(null, chunk.toUpperCase() + "\n");
    },
  });

  myReadable.pipe(myTransform).pipe(process.stdout);
  myReadable.push("Hello");
  myReadable.push("World");

  // HELLO
  // WORLD
}

{
  const myReadable = stream.Readable({
    objectMode: true,
    read() {},
  });

  const myTransform = new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      callback(null, chunk.toLocaleDateString() + "\n");
    },
  });

  myReadable.pipe(myTransform).pipe(process.stdout);
  myReadable.push(new Date("02, 05, 1986"));
  myReadable.push(new Date("01, 25, 1991"));

  // 2/5/1986
  // 1/25/1991
}

{
  const myReadable = stream.Readable({
    read() {},
  });

  const toDateObjectTransform = stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      callback(null, new Date(chunk.toString("utf8")));
    },
  });

  const toDateStringTransform = new stream.Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
      const months = ["Jan", "Feb", "Mar", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; // prettier-ignore
      callback(null, months[chunk.getMonth()] + "\n");
    },
  });

pipelineAsync(
myReadable,
toDateObjectTransform,
toDateStringTransform,
process.stdout
)
.finally(() => console.log("Complete"))
.catch(console.error);

  stream.pipeline(
    myReadable,
    toDateObjectTransform,
    toDateStringTransform,
    // process.stdout,
    (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Complete!");
      }
    }
  );

  myReadable.push("02, 05, 1986");
  myReadable.push("01, 25, 1991");
  myReadable.emit("end")

  // Jan
  // Feb
}
