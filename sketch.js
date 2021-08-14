var trex ,trex_running;
var edges;
var ground, ground_image;
var ground_invis;
var cloud, cloudpng
var score = 0;
var rand;
var obstacle, obstaclepng, obstaclepng2, obstaclepng3, obstaclepng4, obstaclepng5, obstaclepng6;
var obstacle_group;
var cloud_group;
var gamestate = "play"
var trex_collided;
var game_over, overimg;
var restart; restartpng;
var jumpSound, dieSound, checkpointSound;



function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  cloudpng = loadImage("cloud.png");
  
  obstaclepng = loadImage("obstacle1.png");
  obstaclepng2 = loadImage("obstacle2.png");
  obstaclepng3 = loadImage("obstacle3.png");
  obstaclepng4 = loadImage("obstacle4.png");
  obstaclepng5 = loadImage("obstacle5.png");
  obstaclepng6 = loadImage("obstacle6.png");
  trex_collided = loadAnimation("trex_collided.png");
  overimg = loadImage("gameOver.png");
  restartpng = loadImage("restart.png");
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkpointSound = loadSound("checkPoint.mp3");
}

//var marks = [4, 5, 6, 7, 8];
//var sum = 0;
//for(i = 0; i<marks.length; i++){
//  console.log(marks[i]);
//  sum = sum + marks[i];
//}
//console.log(sum/marks.length);

function setup(){
  createCanvas(600,200)
  
  restart = createSprite(300, 150);
  restart.addImage(restartpng);
  restart.scale = 0.7;  
  restart.visible = false;

  game_over = createSprite(300, 100);
  game_over.addImage(overimg);
  game_over.scale = 0.7;
  game_over.visible = false;


  //create a trex sprite
  trex = createSprite(50, 160, 20, 30);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

  ground = createSprite(300, 180, 600, 20);
  ground.addImage(ground_image);
  
  edges = createEdgeSprites();

  // create invisible ground
  ground_invis = createSprite(300, 190, 600, 10);
  ground_invis.visible = false;

  obstacle_group = new Group();
  cloud_group = new Group();
  trex.debug = true
  trex.setCollider("rectangle", 0, 0, trex.width+ 100, trex.height);
}

function draw(){
  background("white")


  text("Score: "+ score, 500, 50)
  
  
  if(gamestate == "play"){
    // reset ground
  ground.velocityX = -(2 + score / 500);
  if(ground.x <= 100){
    ground.x = ground.width/2;
  }

  // jump with space
  if(keyDown("space") && trex.y > 160){
    trex.velocityY = -10;
    jumpSound.play();
  }
  score = score + Math.round(frameCount / 100);
  if(score % 500 === 0 && score> 0){
    checkpointSound.play();
  }
  // add gravity to trex     
 trex.velocityY = trex.velocityY + 0.5;

 
 
  

  
  spawnclouds();
  obstacles();

  if(obstacle_group.isTouching(trex)){
    //dieSound.play();
    //gamestate = "end";
    trex.velocityY = -10;
    jumpSound.play();

  }


  }

  else if(gamestate == "end"){
    ground.velocityX = 0;
    trex.velocityY = 0;

    game_over.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided",trex_collided);
    obstacle_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    cloud_group.setLifetimeEach(-1);
    obstacle_group.setLifetimeEach(-1);
    }


 
      
  trex.collide(ground_invis);
  drawSprites();
}

function spawnclouds(){
  
  if(frameCount % 80 == 0){
    cloud = createSprite(600, 100, 20, 20);
    cloud.velocityX = -2;0, 
    r = Math.round(random(10, 100));
    cloud.y = r;
    cloud.addImage(cloudpng);
    cloud.scale = 0.5;

    while(trex.depth<cloud.depth){
      trex.depth = trex.depth + 2;
    }
    cloud.lifetime = 300;
    cloud_group.add(cloud);
    }
    

}

function obstacles(){
  if(frameCount % 60 == 0){
    obstacle = createSprite(600, 165);
    obstacle.velocityX = -(5 + score / 500);  
    rand = Math.round(random(1, 6));
    switch(rand){
      case 1: 
        obstacle.addImage(obstaclepng);
        break;
      case 2: 
        obstacle.addImage(obstaclepng2);
        break;
      case 3: 
        obstacle.addImage(obstaclepng3);
        break;
      case 4: 
        obstacle.addImage(obstaclepng4);
        break;
      case 5: 
        obstacle.addImage(obstaclepng5);
        break;
      case 6: 
        obstacle.addImage(obstaclepng6);
        break;
      default:
        break;
      
    }
    obstacle.scale = 0.7;
    obstacle.lifetime = 120
    obstacle_group.add(obstacle);
  }
}