var gameRunning = false;
var gameOver = false;

async function startGame() {
  gameRunning = true;
  moveCandy();
  revealCandy();
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
  showMessage("Snake has hit itself! Game over. Refresh page to restart");
}
