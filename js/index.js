// GLOBAL VARIABLES
let canvas = document.getElementById("miningZone");
let context = canvas.getContext("2d");
let canvasWidth = 0
let canvasHeight = 0
let speed = 2
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let playerHeight = 75;
let playerWidth = 60;
let playerX = 0
let playerY = 0
let isValidMove = false
let image = new Image();
image.src = "image/image77.png";

//sets the canvas width and height
const initilizeCanvas = () =>{
    //will be window's innerWidth
    canvasWidth = canvas.width = document.querySelector("#miningZone").width
    canvasHeight = canvas.height = document.querySelector("#miningZone").height

    // these centers player in the center of the canvas
    playerX = (canvas.width - playerWidth)/2
    playerY = (canvas.height - playerHeight)/2
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
     playerX = (e.pageX - canvas.offsetLeft - playerWidth) / 2;
     playerY = (e.pageY - canvas.offsetTop - playerHeight) / 2;
    // playerX = (canvas.width - playerWidth)/2
    // playerY = (canvas.height - playerHeight)/2
     
 }

 class validateMove {
    constructor(nextX, nextY, canvasWidth, canvasHeight) {
        if (nextX + this.width <= canvasWidth && nextX >= 0 && nextY + this.height <= canvasHeight && nextY >= 0) {
            this.playerX = nextX;
            this.playerY = nextY;
        }
    }
}

//when key is pressed it controls
//the direction and the speed of the avator 
 function keyBoardMoves(){
    console.log(canvasWidth)
     // keyboard moves
     if(rightPressed) {
        //playerX += 2;
        validateMove(playerX + speed, playerY, canvasWidth, canvasHeight)
    }
    else if(leftPressed) {
        //playerX -= 2;
        validateMove(playerX - speed, playerY, canvasWidth, canvasHeight)
    }
    if(downPressed) {
        //playerY += 2;
        validateMove(playerX, playerY, canvasWidth + speed, canvasHeight)
    }
    else if(upPressed) {
        //playerY -= 2;
        validateMove(playerX, playerY, canvasWidth, canvasHeight - speed)
    }
 }

 function clean(){
    //0 0 will clean everything 
    // then canvas.width and canvas.height 
    // will draw in the miningZone
    context.fillRect(0, 0, canvas.width, canvas.height)
    //context.clearRect(0, 0, canvas.width, canvas.height)
 }

 // draws the player or the gold miner
 function drawMiner(){
     context.drawImage(image, playerX, playerY, playerWidth, playerHeight);
 }

 // draw function
 function miningLoop() {
     clean()
     //draws the player or the miner
     drawMiner()
     //moves the player or the miner
     keyBoardMoves()
     //requestAnimationFrame calls the miningLoop func. when it has 
     //a new frame that can be drawn to
     requestAnimationFrame(miningLoop);
 }

 // drawing continue
 miningLoop();
