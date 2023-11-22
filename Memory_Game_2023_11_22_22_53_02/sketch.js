function setup() {
  createCanvas(1000, 800);
  textSize(30);
  image (wood,0,0,400,700);
  drawUI();
}
var imageCollection={};
var imagePaths={};
let animals=[];
function preload() {
animals[0]='Pngs/bat.png';
animals[1]='Pngs/beaver.png';
animals[2]='Pngs/bee.png';
animals[3]='Pngs/bison.png';
animals[4]='Pngs/camel.png';
animals[5]='Pngs/croc.png';
animals[6]='Pngs/ladybug.png';
animals[7]='Pngs/monkey.png';
animals[8]='Pngs/pufferfish.png';
animals[9]='Pngs/ram.png';
animals[10]='Pngs/rhino.png';
animals[11]='Pngs/sauropod.png';
animals[12]='Pngs/shark.png';
animals[13]='Pngs/skunk.png';
animals[14]='Pngs/tiger.png';
animals[15]='Pngs/trex.png';
animals[16]='Pngs/jellyfish.png';
animals[17]='Pngs/elephant.png';
animals[18]='Pngs/giraffe.png';
animals[19]='Pngs/gorilla.png';
animals[20]='Pngs/hedgehog.png';

wood = loadImage('Pngs/wood.png');
}

let bison; let camel; let croc; let elephant; let giraffe; let gorilla; let hedgehog; let jellyfish; let ladybug; let monkey; let pufferfish; let ram; let rhino; let sauropod; let shark; let skunk; let tiger; let trex; let wood; 

let b2x4; let b3x4; let b4x4; let b4x5; let b3x3; let b5x6; let b6x6; let b6x7;

let rectangles=[];

var tries=0;
var rows;
var numRow;
var columns;
var numCol;

function draw() {
 winCondition();
}

function winCondition(){
   if (score==rows*columns/2){
   image (wood,0,0,400,700);
    fill('gold');
  rect(50,100,300,500);
   fill('black');
   text('You Win!', 150, 250);
   text(("Tries: "+str(tries)),150,350);
 }
}

function drawUI(){
  fill('black');
  rect(50,100,300,500);
  fill('gold');
  text('Select a Level', 100, 150);
  
b2x4 = createButton('2x3');
b2x4.position(100,200);
b2x4.size(75,50);
b2x4.mousePressed(setCards5);

b3x4 = createButton('3x4');
b3x4.position(100, 300);
b3x4.size(75,50);
b3x4.mousePressed(setCards2);

b4x4 = createButton('4x4');
b4x4.position(225, 300);
b4x4.size(75,50);
b4x4.mousePressed(setCards3);

b4x5 = createButton('4x5');
b4x5.position(100, 400);
b4x5.size(75,50);  
b4x5.mousePressed(setCards4);
  
b3x3 = createButton('2x4');
b3x3.position(225, 200);
b3x3.size(75, 50);
b3x3.mousePressed(setCards1);

b5x6 = createButton('5x6');
b5x6.position(225, 400);
b5x6.size(75, 50);
b5x6.mousePressed(setCards6);

b6x6 = createButton('6x6');
b6x6.position(100, 500);
b6x6.size(75, 50);
b6x6.mousePressed(setCards7);

b6x7 = createButton('6x7');
b6x7.position(225, 500);
b6x7.size(75, 50);
b6x7.mousePressed(setCards8);

}

function setCards1(){
  rows=2;
  columns=4;
  startGame();
}

function setCards2(){
  rows=3;
  columns=4;
  startGame();
}

function setCards3(){
  rows=4;
  columns=4;
  startGame();
}

function setCards4(){
  rows=4;
  columns=5;
  startGame();
}

function setCards5(){
  rows=2;
  columns=3;
  startGame();
}

function setCards6(){
  rows=5;
  columns=6;
  startGame();
}

function setCards7(){
  rows=6;
  columns=6;
  startGame();
}

function setCards8(){
  rows=6;
  columns=7;
  startGame();
}

var rectWidth;
var rectHeight;

function drawCards(row,column){
  for (let i = 0; i < 1; i++) {
    var rectX = (350/rows)*row+40;
    var rectY = (600/columns)*column+50;
    rectWidth = 500/(rows*2);
    rectHeight = 1000/(columns*2);
    rectangles.push({ x: rectX, y: rectY, w: rectWidth, h: rectHeight });
    fill (colorVar);
      for (let rec of rectangles) {
    rect(rec.x, rec.y, rec.w, rec.h);
  }
  }
}
let animalList=[];
let cardList=[];
function assignCards(){
  var numTiles = rows*columns;
  shuffle(animals,true);
  for (let i=0;i<(rows*columns/2);i++){
    var number=int(random(21));
    cardList[i]=loadImage(animals.shift());
  }
  let arraySize = cardList.length;
  for (let j=0;j<arraySize;j++){
    cardList[arraySize+j]=cardList[j];
  }
  shuffle(cardList,true);
}

function startGame(){
image (wood,0,0,400,700);
b2x4.remove();
b3x4.remove();
b4x4.remove();
b4x5.remove();
b3x3.remove();
b5x6.remove();
b6x6.remove();
b6x7.remove();
assignCards();
colorVar=color(random(255),random(255),random(255));
  for (let i=0;i<rows;i++){
  for (let j=0;j<columns;j++){
    drawCards(i,j);
  }
 }
}
var programPaused=false;
var score=0
var card1=true;
var card2=false;
var firstCard;
var cardx;
var cardy;
var cardx1;
var cardy1;

function cardsFlipped(num){
  if(card1==true){
    firstCard=cardList[num];
    card1=false;
    card2=true;
    let cardIndex1=num;
    cardx=rectangles[num].x;
    cardy=rectangles[num].y;
  }
  else if(card2==true){
    cardx1=rectangles[num].x;
    cardy1=rectangles[num].y;
    if(firstCard==cardList[num]){
      console.log("success");
      card1=true;
      card2=false;
      score++;
      tries++;
    }
    else{
      console.log("failure");
      card1=true;
      card2=false;
      tries++;
      programPaused=true;
      setTimeout(resetCards,1000);
      programPaused=false;
    }
  }
}

function resetCards(num1,num2){
  fill(colorVar);
  rect(cardx,cardy,rectWidth, rectHeight);
  rect(cardx1,cardy1,rectWidth, rectHeight);
}

function mouseClicked() {
  if(programPaused==false){
  for (let i = 0; i < rectangles.length; i++) {
    let rect1 = rectangles[i];
    if (mouseX > rect1.x && mouseX < rect1.x + rect1.w && mouseY > rect1.y && mouseY < rect1.y + rect1.h) {
      fill('white');
      rect(rect1.x,rect1.y,rect1.w,rect1.h);
      if (true){
      image(cardList[i], rect1.x+5, rect1.y,rect1.w-10,rect1.h-10);
      console.log(i);
      cardsFlipped(i);
      }
    }
  }}
}