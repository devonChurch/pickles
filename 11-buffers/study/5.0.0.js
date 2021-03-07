{
    const myBuffer = Buffer.alloc(10);
    console.log(myBuffer);
    console.log(myBuffer.length);

    const part1 = myBuffer.slice(0, 5);
    const part2 = myBuffer.slice(5, 10);

    console.log({
        part1, part2
    });

    const newBuffer = Buffer.concat([part1, part2])

    console.log(newBuffer);
    console.log(newBuffer.length);
}