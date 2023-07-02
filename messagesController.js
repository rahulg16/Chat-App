const Message = require("./model");

async function getAllMessages(req, res) {
  let allMessages = await Message.find({});

  res.json({
    status: "success",
    messages: allMessages.reverse()
  })
}

async function addMessage(req, res) {
  console.log("body", req.body);
  let body = req.body
  await Message.create(body)
    .then((data) => {
      io.emit("messageAdded", { data: body });
      res.status(200).json({
        status: "Success",
        message: "Message sent",
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "Failed",
        message: "Something went wrong",
      });
      console.log("error while adding message", err);
    });
}

module.exports = { getAllMessages, addMessage };
