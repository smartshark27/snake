function revealCandy() {
  const candy = getElement("candy");
  candy.setAttribute("display", "initial");
}

function moveCandy() {
  const candy = getElement("candy");
  const [x, y] = getRandomPositionOn("canvas");
  candy.setAttribute("display", "initial");
  candy.setAttribute("cx", x);
  candy.setAttribute("cy", y);
}
