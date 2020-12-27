{
  const buffer = Buffer.from("hello world", "utf8");
  const json = JSON.stringify(buffer);
  console.log(json);
  // {
  //     "type": "Buffer",
  //     "data": [104,101,108,108,111,32,119,111,114,108,100]
  // }
}

{
  const buffer = Buffer.from(
    {
      type: "Buffer",
      data: [104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100],
    },
    "utf8"
  );
  const message = buffer.toString();
  console.log(message); // hello world
}
