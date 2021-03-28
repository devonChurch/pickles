const fsp = require("fs").promises;
const path = require("path");

[
    {
        title: '7.0.0-one.txt',
        content: 'potato'
    },
    {
        title: '7.0.0-two.txt',
        content: 'banana'
    },
    {
        title: '7.0.0-three.txt',
        content: 'grape'
    },
].forEach(({ title, content }) => {
    test(`should create, transform and write [${title}] with the content [${content}]`, async () => {

        const request = fsp.readFile(
            path.resolve(__dirname, title),
            { encoding: "utf8" }
        );
    
        expect(request).resolves.toEqual(content);
    });
});