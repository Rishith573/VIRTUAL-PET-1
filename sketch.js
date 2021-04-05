var dog, dogImg, happydogImg, foodS, foodStock, db;

function preload()
{
	dogImg = loadImage("images/dog.png");
  happydogImg = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(275, 350, 20, 20)
  dog.addImage(dogImg)
  dog.scale = 0.25;

  db = firebase.database();
  foodStock = db.ref("Food");
  foodStock.on("value", readStock);


  
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happydogImg)
  }

  drawSprites();
  
  textSize(20);
  fill("yellow")
  text("food available :" + foodS, 200, 200);
  

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x = x-1;
  }

  db.ref('/').update({
    Food:x
  })
}


