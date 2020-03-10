var gameRunning = false;
var gameOver = false;
var currentScore = 0;
var highScore = 0;

function prepareGame() {
  createMessageBox();
  createScoreBoxes();
  setHighScore(highScore);
  spawnSnake();
  spawnCandy();
  updateMessage("Touch to start");
}

async function startGame() {
  gameRunning = true;
  moveCandy();
  while (gameRunning) {
    await sleep(Math.floor(1000 / FPS));
    moveSnake();
    checkCollision();
    checkGrow();
  }
}

function stopGame() {
  gameRunning = false;
  gameOver = true;
  if (currentScore > highScore) {
    highScore = currentScore;
  }
  updateMessage("Snake has hit itself! Game over. Tap to restart");
}

function resetGame() {
  removeCandy();
  resetSnake();
  removeScoreBoxes();
  gameRunning = false;
  gameOver = false;
  currentScore = 0;
  prepareGame();
}
