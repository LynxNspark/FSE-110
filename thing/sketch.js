const blockWidth = 700;
const blockHeight = 70;
let currentBlock;
let placedBlocks = []; // stores previous blocks
let speed = 5;
let direction = 1;

var winSound;

const playing = "playing";
const lose = "lose";
const win = "win";
let gameState = playing;

function setup() {
  createCanvas(1470,800);
  textSize(20);
  newGame();

}

function preload() {
  winSound = loadSound("sounds/grunt-birthday-party.mp3");
}

function draw() {
  background(220);
  if (gameState === playing) {
    fill(220)
    rect(50,50,100,100);
    drawBlock();
    updateBlock();
  }
  else if (gameState === win) {
    textAlign(CENTER,CENTER);
    fill(0);
    text("You Win", width / 2, height / 2);
  }
  else if (gameState === lose) {
    textAlign(CENTER,CENTER);
    fill(0);
    text("You Lose", width / 2, height / 2);
  }

}

function drawBlock() {
  fill(173,216,230);
  rect(currentBlock.x, currentBlock.y, currentBlock.z, blockHeight); // draws current block
  fill(50);
  for (let block of placedBlocks) {
    rect(block.x, block.y, block.z, blockHeight); // draws previous blocks
  }
  text(placedBlocks.length, 100, 100);
}

function updateBlock() { // moves block back and forth, changing direction at each end of the canvas
  currentBlock.x += speed * direction;
  if(currentBlock.x < 0) {
    direction = 1;
  }
  if (currentBlock.x + currentBlock.z > width) {
    direction = -1;
  }
}

function stopBlock() { // places block 
  const prevBlock = placedBlocks[placedBlocks.length - 1];
  let newWidth = blockWidth;
  if (prevBlock) {
    const left = max(prevBlock.x, currentBlock.x);
    const right = min(prevBlock.x + prevBlock.z, currentBlock.x + currentBlock.z);
    newWidth = right - left;
    currentBlock.z = newWidth;
    currentBlock.x = left;
  }
  if (newWidth < 0) {
    gameState = lose;
    return;
  }
  placedBlocks.push(currentBlock);
  speed *= 1.2;
  nextBlock(newWidth);
}

function nextBlock(newWidth) {
  const blockStackHeight = (placedBlocks.length + 1) * blockHeight;
  if (blockStackHeight > height + blockHeight) {
    gameState = win;
    winSound.play();
    return;
  }
  currentBlock = createVector(0, height - blockStackHeight, newWidth);
}

function keyPressed() {
  if (key === " ") {
    if (gameState === playing) {
      stopBlock();
    }
    else if (gameState === win) {
      newGame();
      gameState = playing;
    }
    else if (gameState === lose) {
      newGame();
      gameState = playing;
    }
  }
}

function newGame() {
  currentBlock = createVector(0, height - blockHeight, blockWidth);
  speed = 5;
  direction = 1;

  placedBlocks = [];
}