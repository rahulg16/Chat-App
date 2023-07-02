const form = document.querySelector(".submit-btn");
const userName = document.getElementById("fname");
const userMessage = document.getElementById("message-area");
const messagesContainer = document.querySelector(".messages-container");
const alert = document.querySelector(".alert-msg");

let socket = io();
let allMessages = [];

async function getAllMessages() {
  let options = {
    method: "GET",
  };

  await fetch("http://localhost:3000/messages", options)
    .then((res) => res.json())
    .then((data) => {
      allMessages = data.messages;

      messagesContainer.innerHTML = data.messages
        .map((message) => {
          return `
            <div class="message-container">
                <h4 class="user-name">
                    ${message.name}:
                </h4>

                <p class="user-message">${message.message}</p>
            </div>
           `;
        })
        .join("");
    })
    .catch((err) => console.log("Error", err));
}
getAllMessages();

async function sendMessage() {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: userName.value, message: userMessage.value }),
  };

  userMessage.value = "";

  await fetch("http://localhost:3000/messages", options)
    .then((res) => res.json())
    .then((data) => {
      console.log("Result", data);
    })
    .catch((err) => console.log("Error", err));
}

form.addEventListener("click", async (e) => {
  e.preventDefault();

  let name = userName.value;
  let message = userMessage.value

  if(name.length != 0 && message.length != 0) {
    sendMessage();
  } else {
    if(name.length) {
        alert
    }
  }
});

socket.on("messageAdded", (socketData) => {
  console.log("messageAdded", socketData);

  let output = `
        <div class="message-container">
            <h4 class="user-name">
                ${socketData.data.name}:
            </h4>

            <p class="user-message">${socketData.data.message}</p>
        </div>
    `

    messagesContainer.insertAdjacentHTML("afterbegin", output);
});
