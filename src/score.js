function createScoreBoxes() {
  createScoreBox("currentScore", "2%", "98%");
  createScoreBox("highScore", "98%", "98%");
}

function createScoreBox(id, x, y) {
  const scoreBox = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "text"
  );
  scoreBox.setAttribute("id", id);
  scoreBox.setAttribute("dominant-baseline", "bottom");
  scoreBox.setAttribute("text-anchor", id === "currentScore" ? "start" : "end");
  scoreBox.setAttribute("x", x);
  scoreBox.setAttribute("y", y);
  scoreBox.setAttribute("font-size", FONT_SIZE);
  getElement("canvas").appendChild(scoreBox);
  scoreBox.textContent =
    id == "currentScore" ? "Current Score: 0" : "High Score: 0";
}

function setCurrentScore(score) {
  const scoreBox = getElement("currentScore");
  scoreBox.textContent = "Current Score: " + score;
}

function setHighScore(score) {
  const scoreBox = getElement("highScore");
  scoreBox.textContent = "High Score: " + score.toString();
}

function removeScoreBoxes() {
  removeElement("currentScore");
  removeElement("highScore");
}
