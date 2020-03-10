var growing = false;
var growAt;
var nextPartID = 0;
const partIDs = [];
var partIsMoving = [];
const partTargetIndexes = [];
const targets = [];

function updateLastTarget(x, y) {
  targets[targets.length - 1] = {
    x: x,
    y: y
  };
}

function spawnSnake() {
  const y = window.innerHeight / 2;
  for (var i = 0; i < SNAKE_START_LENGTH; i++) {
    const x =
      window.innerWidth / 2 - i * (2 * PART_RADIUS + PART_SEPARATION);
    spawnPart(x, y, 0);
  }
  const head = getHead();
  const [headX, headY] = getCirclePosition(head);
  addTarget(headX, headY);
}

function spawnPart(x, y, targetIndex) {
  const part = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  const id = getNextPartID();

  part.setAttribute("id", id);
  part.setAttribute("cx", x);
  part.setAttribute("cy", y);
  part.setAttribute("r", PART_RADIUS);
  part.setAttribute("fill", (id == "part0") ? HEAD_FILL : BODY_FILL);
  getElement("canvas").appendChild(part);

  partIDs.push(id);
  partIsMoving.push(false);
  partTargetIndexes.push(targetIndex);
  return part;
}

function getNextPartID() {
  const id = "part" + nextPartID.toString();
  nextPartID++;
  return id;
}

function getHead() {
  return getElement("part0");
}

function addTarget(x, y) {
  targets.push({
    x: x,
    y: y
  });
}

function setAllPartsMoving() {
  partIsMoving = partIsMoving.map(isMoving => true);
}

function moveSnake() {
  stopped = false;
  for (var i = 0; i < partIDs.length; i++) {
    if (stopped) {
      stopMoving(i);
      continue;
    }
    if (hasReachedTarget(i)) {
      if (!hasNextTarget(i)) {
        stopped = true;
        stopMoving(i);
        continue;
      }
      updateTarget(i);
    }
    movePart(i);
  }
}

function stopMoving(partIndex) {
  partIsMoving[partIndex] = false;
}

function hasReachedTarget(partIndex) {
  const targetIndex = partTargetIndexes[partIndex];
  const target = targets[targetIndex];

  const partID = partIDs[partIndex];
  const part = getElement(partID);
  const [x, y] = getCirclePosition(part);

  return (
    target.x >= x - STEP_DISTANCE / 2 &&
    target.x <= x + STEP_DISTANCE / 2 &&
    target.y >= y - STEP_DISTANCE / 2 &&
    target.y <= y + STEP_DISTANCE / 2
  );
}

function hasNextTarget(partIndex) {
  return partTargetIndexes[partIndex] + 1 < targets.length;
}

function updateTarget(partIndex) {
  partTargetIndexes[partIndex]++;
}

function movePart(partIndex) {
  const id = partIDs[partIndex];
  const part = getElement(id);
  const [x, y] = getCirclePosition(part);

  const targetIndex = partTargetIndexes[partIndex];
  const target = targets[targetIndex];

  const [velocityX, velocityY] = calculateVelocity(
    x,
    y,
    target.x,
    target.y
  );
  const newX = x + velocityX;
  const newY = y + velocityY;
  part.setAttribute("cx", newX);
  part.setAttribute("cy", newY);
}

function checkCollision() {
  checkCollisionWithCandy();
  checkCollisionWithSnake();
}

function checkCollisionWithCandy() {
  const head = getHead();
  const candy = getElement("candy");
  const collision = haveCirclesCollided(head, candy);
  if (collision) {
    moveCandy();
    startGrowing();
  }
}

function startGrowing() {
  growing = true;
  const tail = getTail();
  const [x, y] = getCirclePosition(tail);
  growAt = {
    x: x,
    y: y
  };
}

function checkGrow() {
  if (growing) {
    tryGrow();
  }
}

function tryGrow() {
  const tail = getTail();
  const [tailX, tailY] = getCirclePosition(tail);
  const distanceBetween = getDistanceBetween(
    growAt.x,
    growAt.y,
    tailX,
    tailY
  );
  if (distanceBetween >= 2 * PART_RADIUS + PART_SEPARATION) {
    const tailTarget = partTargetIndexes[partIDs.length - 1];
    spawnPart(growAt.x, growAt.y, tailTarget);
    growing = false;
    growAt = null;
  }
}

function getTail() {
  const id = partIDs[partIDs.length - 1];
  return getElement(id);
}

function checkCollisionWithSnake() {
  if (hasHeadCollidedWithBody()) {
    stopGame();
  }
}

function hasHeadCollidedWithBody() {
  var collision = false;
  const head = getHead();
  partIDs.forEach(id => {
    if (collision) return;
    if (id === partIDs[0]) return;
    const part = getElement(id);
    collision = haveCirclesCollided(head, part);
  });
  return collision;
}