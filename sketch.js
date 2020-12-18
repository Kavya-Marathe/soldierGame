var soldier,soliImage;
var bg,bgImage;
var gun,gunImage,gunGroup;
var obstacle,obstacleImage,obstacleGroup;
var Score=0;
var Survivaltime;
var restart, restartImage;
var gameOver, gameOverImage;
var gameState = "play";
var sound;

function preload(){
  bgImage = loadImage("battlefield.jpg");
  soliImage = loadImage("running soldier(2).png","standing soldier.jpg");
  gunImage = loadImage("gun.png");
  obstacleImage = loadImage("fireBallImage.png");
  gameOverImage = loadImage("gameOverImage.jpg");
  restartImage = loadImage("restartImage.jpg");
  sound=loadSound("fireSound.mp3");
}

function setup() {

  createCanvas(800,800);
  bg = createSprite(400,280,1366,768);
  bg.addImage(bgImage);
  
  bg.x = bg.width/2 ;
  
  obstacleGroup= new Group();
  gunGroup = new Group();
  
  soldier = createSprite(200,100,10,10);
  soldier.addImage("running",soliImage);
  soldier.scale = 3;
  //soldier.velocityX=5;
  

  restart=createSprite(400,380,10,10);
  restart.addImage(restartImage);
  restart.visible=false;
  restart.scale = 0.05;

  gameOver=createSprite(400,300,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible=false;
  gameOver.scale=0.5;

  invisibleGround = createSprite(100,500,800,10);
  invisibleGround.visible = false ;
}   

function draw() {
 background("black");  
  
   
    /*if(gunGroup.isTouching(soldier)){
      Score = Score + 2;
      gunGroup.destroyEach();
    }*/
   
  
  if(gameState=="play"){
    bg.velocityX = -6;
    if(bg.x<1366){ 
      bg.x=bg.width/2;
    }
    Gun();
  obstacles();
       
       if(keyDown("space")&& soldier.y >= 350) {
         soldier.velocityY = -12;
         sound.play();
         }
         soldier.velocityY = soldier.velocityY + 0.8
         soldier.collide(invisibleGround);
   

    if(obstacleGroup.isTouching(soldier)) {
      gameState = "end";
      }
  }
  else
  if(gameState=="end"){
    background("black");
    bg.velocityX=0;
    soldier.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    gunGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1);
    gunGroup.setLifetimeEach(-1);
   // fill("cyan");
   // textSize(35);
    gameOver.visible=true;
    restart.visible=true;
   // text("GAME OVER",148,250);
  }
  if(mousePressedOver(restart)){
    reset();

  }
 /* switch(Score){
    case 10 : soldier.scale = 0.12 ;
             break ;
    case 20 : soldier.scale = 0.14 ;
             break ;
    case 30 : soldier.scale = 0.16 ;
             break ;
    case 40: soldier.scale = 0.18 ; 
             break ; 
    default : break ;     
  }*/
    
  /*if(obstaclesGroup.isTouching(soldier)) {
    gameState = END ;
    }*/
    
  
   
  
  
  /*if( gameState === END) {
    background("black");
    fill("cyan");
    textSize(35);
    text("GAME OVER",148,250);
    
    
  }*/
 
  
  //soliders();
  drawSprites(); 
  textSize(20);
  fill("Light Blue");
  Score = Score + Math.round(getFrameRate()/60);
  text("Survivaltime: "+Score,310, 200);
  
}

  function Gun() {
  if (frameCount % 120 === 0) {
    var gun = createSprite(800,120,40,10);
    gun.y = Math.round(random(250,320 ));
    gun.addImage(gunImage);
    gun.scale = 0.3;
    gun.velocityX = -3;
    
     //assign lifetime to the variable
    gun.lifetime = 160;
    
    //adjust the depth
   // gun.depth = soldier.depth;
    //gun.depth = soldier.depth + 1;
    
    gunGroup.add(gun);
    
  }
   
}


function obstacles(){
  if (frameCount%100  === 0){
    
    obstacle = createSprite(800,430,50,50);
    obstacle.addImage("obstacle", obstacleImage);
    
   obstacle.scale = 0.3 ;
    obstacle.velocityX = -5;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
}

/*function soliders(){
if(frameCount%100==0){
  
  soldier.y=Math.round(random(100,650));
}
}
*/
function reset(){
  gameState="play";
  obstacleGroup.destroyEach();
  gunGroup.destroyEach();
  Score=0;
Survivaltime=0;
gameOver.visible=false;
restart.visible=false;
}


  
  
  
  
  
  
  
  
  
  
  
  
