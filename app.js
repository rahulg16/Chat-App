const express = require("express");
const app = express();
const messagesRouter = require("./route");

app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use("/messages", messagesRouter);

module.exports = app;
