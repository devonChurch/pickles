const stringToBase64 = (string) => {
    const buffer = Buffer.from(string, "utf8");
    return buffer.toString("base64");
};

const base64ToString = (base64) => {
    const buffer = Buffer.from(base64, "base64");
    return buffer.toString("utf8");
};


console.log(stringToBase64("hello world"));
console.log(base64ToString("aGVsbG8gd29ybGQ="));