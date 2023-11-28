let board = [];
let cols, rows;
let blockSize = 40;
let currentPiece;
let gameOver = false;
let moveSpeedMultiplier = 1.5

; 

function setup() {
  createCanvas(400, 700);
  cols = floor(width / blockSize);
  rows = floor(height / blockSize);
  initializeBoard();
  spawnNewPiece();
}

function draw() {
  background(220);

  if (gameOver) {
    displayGameOverScreen();
  } else {
    updateBoard();
    drawBoard();
    drawPiece();
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    movePiece(-1);
  } else if (keyCode === RIGHT_ARROW) {
    movePiece(1);
  } else if (keyCode === DOWN_ARROW) {
    movePiece(0, 1);
  } else if (keyCode === UP_ARROW) {
    rotatePiece();
  }
}

function movePiece(xOffset, yOffset = 0) {
  if (isValidMove(currentPiece, xOffset, yOffset)) {
    currentPiece.x += xOffset;
    currentPiece.y += yOffset;
    return true;
  }
  return false;
}

function rotatePiece() {
  let rotatedPiece = rotateMatrix(currentPiece.shape);
  if (isValidMove({ ...currentPiece, shape: rotatedPiece }, 0, 0)) {
    currentPiece.shape = rotatedPiece;
  }
}

function rotateMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = new Array(cols).fill().map(() => new Array(rows).fill(0));

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][rows - 1 - i] = matrix[i][j];
    }
  }

  return result;
}

function isValidMove(piece, xOffset, yOffset) {
  for (let i = 0; i < piece.shape.length; i++) {
    for (let j = 0; j < piece.shape[i].length; j++) {
      if (
        piece.shape[i][j] &&
        ((board[piece.y + i + yOffset] && board[piece.y + i + yOffset][piece.x + j + xOffset]) !== undefined ||
          piece.x + j + xOffset < 0 ||
          piece.x + j + xOffset >= cols ||
          piece.y + i + yOffset >= rows)
      ) {
        return false;
      }
    }
  }
  return true;
}

function updateBoard() {
  if (frameCount % (30 / moveSpeedMultiplier) === 0) {
    if (!movePiece(0, 1)) {
      placePiece();
      clearLines();
      spawnNewPiece();
    }
  }
}

function placePiece() {
  for (let i = 0; i < currentPiece.shape.length; i++) {
    for (let j = 0; j < currentPiece.shape[i].length; j++) {
      if (currentPiece.shape[i][j]) {
        board[currentPiece.y + i][currentPiece.x + j] = currentPiece.color;
      }
    }
  }
  checkGameOver();
}

function clearLines() {
  for (let i = rows - 1; i >= 0; i--) {
    if (board[i].every((cell) => cell !== undefined)) {
      board.splice(i, 1);
      board.unshift(new Array(cols).fill(undefined));
    }
  }
}

function drawBoard() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] !== undefined) {
        fill(board[i][j]);
        stroke(0);
        rect(j * blockSize, i * blockSize, blockSize, blockSize);
      }
    }
  }
}

function drawPiece() {
  for (let i = 0; i < currentPiece.shape.length; i++) {
    for (let j = 0; j < currentPiece.shape[i].length; j++) {
      if (currentPiece.shape[i][j]) {
        fill(currentPiece.color);
        stroke(0);
        rect((currentPiece.x + j) * blockSize, (currentPiece.y + i) * blockSize, blockSize, blockSize);
      }
    }
  }
}

function spawnNewPiece() {
  const pieces = [
    { shape: [[1, 1, 1, 1]], color: color(255, 0, 0) },
    { shape: [[1, 1], [1, 1]], color: color(0, 255, 0) },
    { shape: [[1, 1, 1], [1, 0, 0]], color: color(0, 0, 255) },
    { shape: [[1, 1, 1], [0, 0, 1]], color: color(255, 255, 0) },
    { shape: [[1, 1], [1, 1]], color: color(0, 0, 255) }, // 2x2 block
    { shape: [[0, 1, 0], [1, 1, 1]], color: color(255, 0, 255) }, // T-shape block
  ];
  currentPiece = random(pieces);
  currentPiece.x = floor(cols / 2) - floor(currentPiece.shape[0].length / 2);
  currentPiece.y = 0;
}

function initializeBoard() {
  for (let i = 0; i < rows; i++) {
    board.push(new Array(cols).fill(undefined));
  }
}

function displayGameOverScreen() {
  fill(0);
  textSize(30);
  text("Game Over", width / 2 - 80, height / 2 - 20);
  textSize(20);
  text("Press 'R' to restart", width / 2 - 120, height / 2 + 20);
}

function resetGame() {
  initializeBoard();
  spawnNewPiece();
  gameOver = false;
}

function checkGameOver() {
  if (currentPiece.y <= 0) {
    gameOver = true;
  }
}
