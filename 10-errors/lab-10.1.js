const assert = require("assert");

const parseUrl = (url) => {
  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    parsedUrl = null;
  }
  return parsedUrl;
};

// Should return valid URL.
{
  const url = parseUrl("http://www.example.com");
  assert.ok(url instanceof URL);
}

// Should return `null` when encountering an invalid URL and not throw an error.
{

  assert.doesNotThrow(() => parseUrl("123"));
  assert.strictEqual(parseUrl("123"), null);
}
