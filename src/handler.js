function handleLoad() {
  fitToScreen();
  spawnSnake();
  showMessage("Touch to start");
}

function handleMouseClick(event) {
  if (gameOver) return;
  removeMessage();
  const head = getHead();
  const [headX, headY] = getCirclePosition(head);
  updateLastTarget(headX, headY);
  addTarget(event.clientX, event.clientY);
  setAllPartsMoving();
  if (!gameRunning) {
    startGame();
  }
}
