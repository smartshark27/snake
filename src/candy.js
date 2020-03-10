function spawnCandy() {
  const candy = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  candy.setAttribute("id", "candy");
  candy.setAttribute("cx", -1000); // Position off screen
  candy.setAttribute("cy", -1000);
  candy.setAttribute("r", CANDY_RADIUS);
  candy.setAttribute("fill", CANDY_FILL);
  getElement("canvas").appendChild(candy);
}

function moveCandy() {
  const candy = getElement("candy");
  const [x, y] = getRandomPositionOn("canvas");
  candy.setAttribute("display", "initial");
  candy.setAttribute("cx", x);
  candy.setAttribute("cy", y);
}

function removeCandy() {
  removeElement("candy");
}
