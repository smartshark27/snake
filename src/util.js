function fitToScreen() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const canvas = getElement("canvas");
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  const background = getElement("background");
  background.setAttribute("width", width);
  background.setAttribute("height", height);
}

function getCirclePosition(circle) {
  const x = Number(circle.getAttribute("cx"));
  const y = Number(circle.getAttribute("cy"));
  return [x, y];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomPositionOn(rectID) {
  const rect = getElement(rectID);
  const width = canvas.getAttribute("width");
  const height = canvas.getAttribute("height");
  const x = generateRandomNumberBetween(0, width);
  const y = generateRandomNumberBetween(0, height);
  return [x, y];
}

function generateRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function calculateVelocity(x, y, targetX, targetY) {
  const displacementX = x - targetX;
  const displacementY = y - targetY;
  const angle = Math.atan(displacementY / displacementX);
  const speedX = Math.cos(angle) * STEP_DISTANCE;
  const speedY = Math.sin(angle) * STEP_DISTANCE;
  const velocityX = targetX >= x ? speedX : -speedX;
  const velocityY = targetX >= x ? speedY : -speedY;
  return [velocityX, velocityY];
}

function haveCirclesCollided(circleA, circleB) {
  const aX = circleA.getAttribute("cx");
  const aY = circleA.getAttribute("cy");
  const bX = circleB.getAttribute("cx");
  const bY = circleB.getAttribute("cy");
  const distanceBetween = getDistanceBetween(aX, aY, bX, bY);
  const aRadius = Number(circleA.getAttribute("r"));
  const bRadius = Number(circleB.getAttribute("r"));
  return distanceBetween < aRadius + bRadius;
}

function getDistanceBetween(aX, aY, bX, bY) {
  const xDiff = Math.abs(aX - bX);
  const yDiff = Math.abs(aY - bY);
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

function getElement(id) {
  return document.getElementById(id);
}

function removeElement(id) {
  const element = getElement(id);
  if (element) {
    element.remove();
  }
}
