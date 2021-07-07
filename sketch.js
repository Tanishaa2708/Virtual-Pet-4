//Create variables here
var food, stilldog,happydog
var gameState = "hungry"
var bedroomImg,gardenImg,washroomImg;
function preload()
{
	//load images here
  stilldog = loadImage("images/dogImg.png")
  happydog = loadImage("images/dogImg1.png")
  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg = loadImage("images/Wash Room.png")
}

function setup() {
	createCanvas(800, 700);
  database= firebase.database()
  database.ref('food').on("value",readPosition)

  milk1 = new Food()
  milk1.getfeedTime()

  database.ref('gameState').on("value",(data)=>{
    gameState = data.val()
  })

  dog = createSprite(700,400,50,50)
  dog.addImage(stilldog)
  dog.scale = 0.2

  bathButton = createButton("i want to take a bath")
  bathButton.position(500,200)

  sleepButton = createButton("i am very sleepy")
  sleepButton.position(700,200)

  playButton = createButton("lets sleep")
  playButton.position(850,200)

  hungryButton = createButton("i am hungry")
  hungryButton.position(950,200)
  
}


function draw() {  
  background("pink")
  drawSprites();
  //add styles here
  textSize(20)
  text("fedtime: " + milk1.feedtime, 200,50)
  milk1.buttons()
  milk1.milkImg()
  
  bathButton.mousePressed(()=>{
    gameState = "bathing"
  })
  
  sleepButton.mousePressed(()=>{
    gameState = "sleeping"
  })

  playButton.mousePressed(()=>{
    gameState = "playing"
  })

  hungryButton.mousePressed(()=>{
    gameState = "hungry"
  })


  currentTime = hour()
  if(gameState === "playing"){
     milk1.updateState("playing")
     milk1.garden()
  }
  else if(gameState === "sleeping"){
    milk1.updateState("sleeping")
    milk1.bedRoom()
  }
  else if(gameState === "bathing"){
    milk1.updateState("bathing")
    milk1.washRoom()
  }
  else if(gameState === "hungry") {
    milk1.updateState("hungry")
  }

  if(gameState !== "hungry"){
    milk1.button1.hide();
    milk1.button2.hide();
    dog.remove()
  }
  else{
    milk1.button1.show();
    milk1.button2.show();
    dog.addImage(happydog)
    dog.scale = 0.2
    
  }

  if(food===0){
       dog.addImage(happydog)
    dog.scale = 0.2
    
     
  }
  drawSprites();
 
}

function readPosition(data){
  food = data.val()
}
function writeStock(data){
  database.ref('/').set({
    food:data, 
    feedtime:hour()
  })
}

drawSprites();





