const stream = require("stream");

{
    const duplexStream = stream.Duplex({
        objectMode: true,
        read(size) {},
        write(chunk, encoding, callback) {
            this.push(chunk + "...")
            callback();
        }
    });

    const transformStream = stream.Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            this.push(Number(chunk) * 100 + "");
            callback()
        }
    })

    const readStream = stream.Readable({
        objectMode: true,
        read(size) {},
    });

    let tick = 0;
    const interval = setInterval(() => {
        tick += 1;
        if (tick > 10) {
            readStream.push(null);
            clearInterval(interval);
        } else {
            readStream.push(`${tick}`);
        }
    }, 200);

    readStream
        .pipe(transformStream)
        .pipe(duplexStream)
        .pipe(process.stdout)
}
