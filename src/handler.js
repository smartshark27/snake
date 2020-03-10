function handleLoad() {
  fitToScreen();
  prepareGame();
}

function handleMouseClick(event) {
  if (gameOver) {
    resetGame();
    return;
  }
  clearMessage();
  const head = getHead();
  const [headX, headY] = getCirclePosition(head);
  updateLastTarget(headX, headY);
  addTarget(event.clientX, event.clientY);
  setAllPartsMoving();
  if (!gameRunning) {
    startGame();
  }
}
