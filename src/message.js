function createMessageBox() {
  const messageTextbox = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  messageTextbox.setAttribute("id", "messageBox");
  messageTextbox.setAttribute("dominant-baseline", "middle");
  messageTextbox.setAttribute("text-anchor", "middle");
  messageTextbox.setAttribute("x", "50%");
  messageTextbox.setAttribute("y", "20%");
  messageTextbox.setAttribute("font-size", FONT_SIZE);
  getElement("canvas").appendChild(messageTextbox);
}

function updateMessage(message) {
  console.log(message);
  const messageTextbox = getElement("messageBox");
  messageTextbox.textContent = message;
}

function clearMessage() {
  const messageTextbox = getElement("messageBox");
  messageTextbox.textContent = "";
}

function removeMessageBox() {
  removeElement("messageTextbox");
}
