var edges;
var player,player_image;
var projectile;
var bg,bgImage;
var enemy,enemy_image;
var enemyGroup,projectileGroup;
var PLAY=1
var END=0;
var gameState=PLAY;
var score=0;
var restart,restart_image;
var gameOver, gameOverImage;
function preload(){
  player_image=loadImage("fighter jet.png");
  bgImage=loadImage("bg.jpg");
  enemy_image=loadImage("fighter jet 2.png");
  restart_image=loadImage("reset.png");
  gameOverImage=loadImage("gameOver.png");
}
function setup() {
  createCanvas(400,600);
  bg=createSprite(200,600,400,600);
  bg.scale=3;
  bg.addImage("BG",bgImage);
  
  player=createSprite(200, 400, 30, 30);
  player.addImage(player_image);
  player.scale=0.5;
  player.setCollider("rectangle",0,5,50,240);
  player.debug=false;

  edges=createEdgeSprites();

  restart=createSprite(190,330,100,30);
  restart.addImage(restart_image);
  restart.scale=0.4;
  restart.visible=false;

  gameOver=createSprite(190,280,100,30);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;
  gameOver.visible=false;

  projectileGroup=new Group();
  enemyGroup=new Group();
}

function draw() {
  background("lightblue");
  fill("black");
  text("Presiona las flechas para moverte",10,500);
  text("Presiona la barra espaciadora para disparar",10,550);
  textSize(20);
  text("score "+score,300,20);

  if(gameState==PLAY){

    if(keyDown("RIGHT_ARROW")){
      player.velocityX=10;
    }
    else{
      player.velocityX=0;
    }
    if(keyDown("LEFT_ARROW")){
      player.velocityX=-10;
    }
  
    if(keyDown("UP_ARROW")){
      player.velocityY=-10;
    }
    else{
      player.velocityY=0;
    }
    if(keyDown("DOWN_ARROW")){
      player.velocityY=10;
    }
  
    if(keyDown("SPACE")){
      projectile=createSprite(player.position.x,player.position.y,10,10);
      projectile.shapeColor="yellow";
      projectile.velocityY=-20;
      //projectile.lifetime=200;
      projectileGroup.add(projectile);
    }

    if(projectileGroup.isTouching(enemyGroup)){
      enemy.destroy();
      score++;
    }
    player.visible=true;
    
    bg.velocityY=6; 
    if(bg.y>600){
        bg.y=0
      }
  }

  if(gameState==END){
    //player.visible=false;
    bg.velocityY=0;
    player.velocityX=0;
    player.velocityY=0;
    projectileGroup.setVelocityYEach(0);
    enemyGroup.setVelocityYEach(0);
    textSize(50);
    //fill("red");
    //text("Game Over",50,300);
    restart.visible=true;
    gameOver.visible=true;
    if(mousePressedOver(restart)){
      reset();
    }
  }

  if(enemyGroup.isTouching(player)){
    gameState=END;
  }
  Enemy();
  drawSprites();
}
function Enemy(){
  var rand=Math.round(random(0,400));
  if(frameCount%rand==20){
    enemy=createSprite(200,10,30,30);
    enemy.scale=0.1;
    enemy.velocityY=5;
    enemy.x=random(0,400);
    enemy.addImage(enemy_image);
    //enemy.lifetime=200;
    enemyGroup.add(enemy);
  }
}
function reset(){
  gameState=PLAY;
  enemyGroup.destroyEach(0);
  projectileGroup.destroyEach(0);
  restart.visible=false;
  gameOver.visible=false;
  score=0;
  player.position.x=200;
  player.position.y=400;
}