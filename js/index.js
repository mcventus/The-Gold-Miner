// GLOBAL VARIABLES
let canvas = document.getElementById("miningZone");
let context = canvas.getContext("2d");
let canvasWidth = 0
let canvasHeight = 0
let goldMiner = null
let speed = 2
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

//CLASSES

//Miner class
class Miner{
    //constructor for miner class
    constructor(minerX, minerY, minerWidth, minerHeight){

        this.minerX = minerX
        this.minerY = minerY
        this.minerWidth = minerWidth
        this.minerHeight = minerHeight

        //creates instance of an image to draw in the canvas
        const img = new Image()
        img.src = "image/image77.png"
        this.chosenAvatar = img
    }
    // validates the move of the avatar 
    validateMove(nextX, nextY, canvasWidth, canvasHeight){
        console.log("Validate")
        if(nextX + this.minerWidth <= canvasWidth && nextX >= 0 
            && nextY + this.minerHeight <= canvasHeight && nextY >= 0){
                this.minerX = nextX
                this.minerY = nextY
        }

    }
}

//GoldMiner class
class GoldMiner{
    //miner object is initialized in this class
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.miner = new Miner(0, 0, canvasWidth / 10, canvasHeight / 10)
    }

    //drawing miner avatar in the canvas
    //uses the instance of the miner class
    drawMiner(context){
        context.drawImage(this.miner.chosenAvatar, this.miner.minerX, 
            this.miner.minerY, this.miner.minerWidth, this.miner.minerHeight)
    }

    //a function to chose avatar type
    selectAvater(chosenAvatar){
        if(chosenAvatar === "mario"){
            const choice = new Image()
            choice.src = "/images/image77.png"
            // const choice = document.getElementById('minery')
            // this.miner.chosenAvatar = choice
        }
    }
}

//sets the canvas width and height
const initilizeCanvas = () =>{
    console.log("initialize")
    //will be window's innerWidth
    canvasWidth = canvas.width = document.querySelector("#miningZone").width
    canvasHeight = canvas.height = document.querySelector("#miningZone").height

    goldMiner = new GoldMiner(canvasWidth, canvasHeight)

    //goldMiner.selectAvater("mario")
    // these centers player in the center of the canvas
    goldMiner.miner.minerX = (canvas.width - goldMiner.miner.minerWidth)/2
    goldMiner.miner.minerY = (canvas.height - goldMiner.miner.minerHeight)/2
}

initilizeCanvas()

//this event lives on the window and waits
//for an event to resize the canvas and calls seupcanvas() 
//function
window.addEventListener("resize", initilizeCanvas)

// event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler);

 // keyboard down handler
 function keyDownHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = true;
     }
     else if(e.keyCode == 37) {
         leftPressed = true;
     }
     if(e.keyCode == 40) {
         downPressed = true;
     }
     else if(e.keyCode == 38) {
         upPressed = true;
     }
 }

 //keyboard up handler
 function keyUpHandler(e) {
     if(e.keyCode == 39) {
         rightPressed = false;
     }
     else if(e.keyCode == 37) {
         leftPressed = false;
     }
     if(e.keyCode == 40) {
         downPressed = false;
     }
     else if(e.keyCode == 38) {
         upPressed = false;
     }
 }

 // mouse move handler
 function mouseMoveHandler(e) {
    console.log(canvas.offsetLeft)
    if(e.pageX + goldMiner.miner.minerWidth <= canvasWidth && e.pageX >= 0 
        && e.pageY + goldMiner.miner.minerHeight <= canvasHeight && e.pageY >= 0){
        // goldMiner.miner.minerX = (e.pageX - canvas.offsetLeft - goldMiner.miner.minerWidth) / 2;
        // goldMiner.miner.minerY = (e.pageY - canvas.offsetTop - goldMiner.miner.minerHeight) / 2;
    }
    console.log("e pagex : " +e.pageX)
 }

//when key is pressed it controls
//the direction and the speed of the avator 
 function keyBoardMoves(){
     // keyboard moves
     if(rightPressed) {
        goldMiner.miner.validateMove(goldMiner.miner.minerX + speed, goldMiner.miner.minerY, canvasWidth, canvasHeight)
    }
    else if(leftPressed) {
        goldMiner.miner.validateMove(goldMiner.miner.minerX - speed, goldMiner.miner.minerY, canvasWidth, canvasHeight)
    }
    if(downPressed) {
        goldMiner.miner.validateMove(goldMiner.miner.minerX, goldMiner.miner.minerY + speed, canvasWidth, canvasHeight)
    }
    else if(upPressed) {
        goldMiner.miner.validateMove(goldMiner.miner.minerX, goldMiner.miner.minerY - speed, canvasWidth, canvasHeight)
    }
 }

 function clean(){
    //0 0 will clean everything 
    // then canvas.width and canvas.height 
    // will draw in the miningZone
    context.fillRect(0, 0, canvas.width, canvas.height)
    //context.clearRect(0, 0, canvas.width, canvas.height)
 }

 // draw function
 function miningLoop() {
     clean()
     
     goldMiner.drawMiner(context)
     
     //drawMiner(): depreciated 
     keyBoardMoves()
     //requestAnimationFrame calls the miningLoop func. when it has 
     //a new frame that can be drawn to
     requestAnimationFrame(miningLoop);
    }

 // drawing continue
 miningLoop();
