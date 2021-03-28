const requestFiles = require("./4.0.0");

test("is should encode all files types to be the same", async () => {
    const files = await requestFiles().then(data => Object.values(data));
    const areAllTheSame = files.reduce((acc, file, index) => acc && (file === files[0]), true)
    expect(areAllTheSame).toBeTruthy();
})