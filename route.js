const router = require("express").Router();
const { getAllMessages, addMessage } = require("./messagesController");

router.route("/").get(getAllMessages).post(addMessage);

module.exports = router;
