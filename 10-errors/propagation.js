const getSomeStuff = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const willReject = Math.random() > 0.2;
      if (willReject) {
        reject(new Error("something went wrong =("));
      }
      resolve("some stuff =)");
    }, 300);
  });

const makeRequest = async (attempt = 1) => {
  let someStuff;
  try {
    someStuff = await getSomeStuff();
  } catch (error) {
    if (attempt > 2) {
      // Propagate error up to next catch handler if we make too many attempts.
      throw error;
    } else {
      console.error(error);
      console.log("...trying again!");
      return makeRequest(attempt + 1);
    }
  }
  return someStuff;
};

// Keep requesting our async content (via recursion) until the "network" connection
// succeeds and we get our response back!
(async () => {
  console.log("starting...");
  const response = await makeRequest().catch((error) =>
    // Catches "final" error after too may failed attempts.
    console.error("*** error", error)
  );
  console.log("...comelete", response);
})();
