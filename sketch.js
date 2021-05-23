var baloon,baloonImage1,baloonImage2;
var database,height,bg;

function preload(){
  bg=loadImage("b1.png");
  baloonImage1=loadAnimation("b2.png");
  baloonImage2=loadAnimation("b2.png","b2.png","b2.png","b3.png","b3.png","b3.png","b4.png","b4.png","b4.png");

}

function setup() {
  createCanvas(1500,700);
  baloon = createSprite(250, 450, 150, 150);
  baloon.addAnimation("b1",baloonImage1);
  baloon.scale=0.5;
  database=firebase.database();
  database.ref('baloon/height').on("value",readHeight);
}

function draw() {
  background(bg);  
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    baloon.addAnimation("b1",baloonImage2);
  }
  if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    baloon.addAnimation("b1",baloonImage2);
  }
  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    baloon.addAnimation("b1",baloonImage2);
    baloon.scale-=0.005;
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    baloon.addAnimation("b1",baloonImage2);
    baloon.scale+=0.005;
  }
  drawSprites();
  textSize(25);
  stroke("white");
  fill ("Black");
  text("Press The Arrow Keys To Move The Air HOt Baloon",40,40);
}
function updateHeight(x,y){
  database.ref('baloon/height').set({
    x:height.x+x,
    y:height.y+y
  })
}
function readHeight(data){
  height=data.val();
  baloon.x=height.x;
  baloon.y=height.y;
}