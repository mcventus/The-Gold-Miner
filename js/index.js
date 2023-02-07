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
let gotGold = false;
let score = 0
let maxScore = 0

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
        img.src = "image/image_mario.png"
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

//Gold Nuggets Class
class Nugget{
    constructor(nuggetX, nuggetY, nuggetWidth, nuggetHeight){
        this.nuggetX = nuggetX
        this.nuggetY = nuggetY
        this.nuggetWidth = nuggetWidth
        this.nuggetHeight = nuggetHeight
        const img = new Image()
        img.src = "image/gold0132px.png"

    }
}

//GoldMiner class
class GoldMiner{
    //miner object is initialized in this class
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.miner = new Miner(0, 0, canvasWidth / 10, canvasHeight / 10)
        this.nuggets = []
        this.distributeNuggets()
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
            choice.src = "image/image_mario.png"
        }
    }
    //draws and distributes nuggets in the canvas
    distributeNuggets(){
        this.nuggets = []
        //number of nuggets to be distributed in the canvas
        let nOfNuggets = Math.floor(Math.random()) * 2 + 7
        let nuggetX 
        let nuggetY
        let nuggetWidth = 10
        let nuggetHeight = 10
        let factorX = this.canvasWidth - nuggetWidth
        let factorY = this.canvasHeight - nuggetHeight
        
        //producing nuggets
        let index = 0
        while(index <= nOfNuggets){
            nuggetX = Math.floor(Math.random() * factorX)
            nuggetY = Math.floor(Math.random() * factorY)
            //pushing objects of nuggets in to nuggets array
            this.nuggets.push({index : new Nugget(nuggetX, nuggetY, nuggetWidth, nuggetHeight)})
            index++
        }

    }

    drawNuggets(context){
        let nuggetX
        let nuggetY
        let nuggetWidth
        let nuggetHeight

        index = 0
        while(index < this.nuggets.length){
            nuggetX = this.nuggets[index].index.nuggetX
            nuggetY = this.nuggets[index].index.nuggetY
            nuggetWidth = this.nugget[index].index.nuggetWidth
            nuggetHeight = this.nugget[index].index.nuggetHeight
            context.drawImage(imageMaker(canvasWidth, canvasHeight), nuggetX, nuggetY, nuggetWidth, nuggetHeight)
            index++
        }

    }
    //adds or substructs a pre determined distance value 
    //on to the x and y postions of the avatar then compares it
    //with the nugget x & y position to check if there is a position overlap
    goldSensor(context, nextX, nextY){
        let rightMinerPos = nextX + this.miner.minerWidth - 12
        let leftMinerPos = nextX + 12
        let topMinerPos = nextY + 17
        let bottomMinerPos = nextY + this.miner.height -25
        //iterate each object, get the nuggetX and Nugget Y positions 
        //compare it with the calculated values
        this.nuggets.forEach((nugget, index) => {
            if(rightMinerPos >= nugget.index.nuggetX && leftMinerPos <= nugget.index.nuggetX + nugget.index.nuggetWidth
                && bottomMinerPos >= nugget.index.nuggetY && topMinerPos <= nugget.index.nuggetY + nugget.index.nuggetHeight){
                    gotGold = true
                    console.log("gotgold set to true")
                }
        })
        return gotGold
    }
}

//decides which image to be drawn into the canvas at runtime
//based on the canvasWidth and canvasHeight parameters
function imageMaker(canvasWidth, canvasHeight){
    const img = new Image()
    if(canvasWidth <= 400 && canvasHeight <= 400){
        img.src = "image/gold0232px.png"
    }
    else{
        img.src = "image/gold1.png"
    }
    return img
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

 // keyboard down handler
 function keyDownHandler(e) {
    let gotGold = goldMiner.goldTouch(context, goldMiner.miner.minerX, goldMiner.miner.minerY)
    //gameOver()
    if(gotGold){
       console.log("cond fulfilled")
       //context.clearRect(0, 0, canvas.width, canvas.height)
       scoreMaker()
       maxScore(score)
       goldMiner.gotGold = false
    }
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
 
 //score maker updates the score dom element
 function scoreMaker(){
    score += 15
    scoreText.innerHTML = score
    setTimeout(() =>{
       initilizeCanvas()
    }, 500)
    clearTimeout()
 }

 //records the maximum score
 function maxScore(score){
    if(score >= maxScore) {
        maxScore = score
        maxScoreText.innerHTML = maxScore
    }
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
