const { EventEmitter } = require("events");
const events = require("events");

const notificationsEventEmitter = new EventEmitter();

notificationsEventEmitter.on(
  "notifications:create",
  ({ message, sentiment = "netural", onClose }) => {
    console.log("creating notification with:");
    console.log("message:", message);
    console.log("sentiment:", sentiment);
    console.log(
      "onClose:",
      onClose ? "custom close handler" : "no close handler"
    );
  }
);

notificationsEventEmitter.on("error", (error) =>
  notificationsEventEmitter.emit("notifications:create", {
    message: error,
    sentiment: "error",
  })
);

setTimeout(() => {
  notificationsEventEmitter.emit("notifications:create", {
    message: "hello world",
    sentiment: "success",
    onClose: () => console.log("closing!"),
  });

  notificationsEventEmitter.emit("error", new Error("there has been an error"));
}, 1000);
