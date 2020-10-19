
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,food,rocks
var score
var survivalTime=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
 
  monkey=createSprite(80,315,20,20);
 monkey.addAnimation("running",monkey_running);
 monkey.scale=0.1;
  
 ground=createSprite(400,350,1200,10);
 ground.velocityX=-4;
 ground.x=ground.width/2;
 console.log(ground.x);
 
  FoodGroup= new Group();
  obstacleGroup= new Group();
  
  score=0;
}


function draw() {
  background("white");
  
  
  if(keyDown("space") && monkey.y>=210){
  monkey.velocityY=-10;
  
  }
   
  if (ground.x < 0){
  ground.x = ground.width/2;
   }
  monkey.velocityY = monkey.velocityY + 0.5
  monkey.collide(ground);
  
  if(monkey.isTouching(FoodGroup)){
    reset(); 
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  obstacleGroup.collide(ground);
  food();
  obstacle();
  drawSprites();
  
  stroke("white");
  textSize(16);
  fill("blue");
  text("Score: "+score,50,50)
  
  stroke("white");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,200,50);
  
}


function food(){
  if(frameCount%80===0){
  var banana=createSprite(320,Math.round(random(120,200)),20,20);
  banana.addImage("eating",bananaImage)
  banana.scale=0.08;
  banana.velocityX=-6;
  banana.lifetime = 200;
  FoodGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount%300 ===0){
  var rocks=createSprite(600,Math.round(random(310,310)),20,20);
  rocks.addImage("obstacles",obstacleImage)
  rocks.scale=0.08;
  rocks.velocityX=-6;
  rocks.lifetime = 200;
  obstacleGroup.add(rocks);
  }
}

function reset(){
  
  FoodGroup.destroyEach();
  score=score+2;
  
  switch(score){
  case 10: monkey.scale=0.12;
      break;
  case 20: monkey.scale=0.14;
      break;
  case 30: monkey.scale=0.16;
      break;
  case 40: monkey.scale=0.18;
      break;
  default:break;
  }
}