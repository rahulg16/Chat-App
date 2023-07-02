const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const socketio = require("socket.io");

const Messages = require("./model")

let port = process.env.PORT || 3000;

const server = app.listen(port, async () => {
  await mongoose
    .connect(process.env.MONGO_URL)
    .then((data) => console.log("Connected to DB"))
    .catch((err) => console.log("Error connect to DB", err));

    // await Messages.deleteMany({})
  console.log(`Server listening on ${port}`);
});

const io = socketio(server);

io.on("connection", (socket) => {
  console.log("New connection");
});

global.io = io
