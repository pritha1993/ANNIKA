var bg,bgImage;
var annika, annikaImage;
var broom, broomImage;
var dementor,dementorImage;
var rand;
var edges;
var gameState=0;
var dementorG;
function preload(){
    bgImage=loadImage("snow2.jpg")
    annikaImage=loadImage("Annika.png");
   broomImage=loadImage("new broom.png");
   dementorImage=loadImage("dementor.png");
}
function setup(){
  createCanvas(1400,500);
  annika=createSprite(102,250,50,50);
  annika.addImage("witch",annikaImage);
  annika.scale=0.3;
  bg=createSprite(768,250,1400,500);
  bg.addImage("background",bgImage);
  bg.scale=1;
  bg.velocityX=-4;
annika.depth=bg.depth;
annika.depth+=1;

edges=createEdgeSprites();

broom=createSprite(95,265,50,50);
broom.addImage("broom",broomImage);
broom.scale=0.3
broom.depth=annika.depth-1;

dementorG=new Group();
}
function draw(){
 
  if(gameState===0){
    background("pink");
    textSize(35);
    textFont("Lucida Calligraphy")
    fill("purple")
    text("Welcome to the Forbidden Forest!",350,200);
    text("Ready for an adventure with Princess Scabbers?",200,275)
    text("Press 'space' to begin!",450,350);

  }
  if(gameState===0 && keyDown("space")){
    gameState=1; 
  }
  if(gameState===1){
    background("purple");
    textSize(35);
    textFont("Lucida Calligraphy")
    fill("pink")
    text("Help Princess Scabbers avoid the dementors!",230,190);
    text("Instruction: Use the up and down arrow keys to help the Princess move.",20,270);
    text("Press 's' to proceed to the game", 350,350);
  }
  if(gameState===1 && keyDown("s")){
    gameState=2;
  }

  if(gameState===2){
    background("purple");
    if(bg.x<700){
      bg.x=768
  }
    if(keyDown(UP_ARROW)){
      if(annika.y>=50 && annika.y<=450){
        annika.y=annika.y-3;
        broom.y=broom.y-3;
      }
      else{
        annika.bounceOff(edges);
      }
    }
    if(keyDown(DOWN_ARROW)){
      if(annika.y>=50 && annika.y<=450){
        annika.y=annika.y+3;
        broom.y=broom.y+3;
      }
      else{
        annika.bounceOff(edges);
      }
    }
    spawnDementors()
    drawSprites();
    if(dementorG.isTouching(annika)){
      gameState=3;
    }
  }
  if(gameState===3){
    background("black");
    dementorG.destroyEach();
   
    textSize(35);
    textFont("snap itc")
    fill("red")
    text("Oh no! The dementors got to Princess Scabbers :( ",230,190);
    text("Press 'r' to restart",500,250); 
  }
  if(gameState===3 && keyDown("r")){
    gameState=0;
  }
  if(frameCount===2500){
    gameState=4;
    
  }
  if(gameState===4){
    background("black");
    textSize(22);
    textFont("Viner Hand ITC")
    fill("green")
    text("YESSS! PRINCESS SCABBERS HAS SUCCESFULLY AVOIDED THE DEMENTORS AND REACHED HOGWARTS! ",50,190);
    text("Press 'r' to restart",600,250); 
  }
  if(gameState===4 && keyDown("r")){
    gameState=0;
  }
}
function spawnDementors(){
if(frameCount%200===0){
  rand=Math.round(random(100,350));
  dementor=createSprite(1500,rand,50,50);
  dementor.addImage(dementorImage);
  dementor.velocityX=-6;
  dementor.scale=0.2;
  dementor.depth=bg.depth;
  dementor.depth+=1;
dementor.lifetime=1400
  dementorG.add(dementor);
}
}