// GLOBAL VARIABLES
let canvas = document.getElementById("miningZone");
let context = canvas.getContext("2d");
let scoreText = document.querySelector(".gold-score");
let maxScoreText = document.getElementById("gold-score-max");
let currentScore = document.getElementById("gold-score-current");
let clockTicking = document.querySelector('#time');

let canvasWidth = 0
let canvasHeight = 0
let goldMiner = null
let gotGold = false
let speed = 2
let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;
let score = 0
let maxScore = 0
let playOn = false 
let winScore = 10000
let playbtn = document.querySelector("#playindex");
//timer functions
let timerId = null;
//time to play the game is 1 min
let timeRemaining = 60;
let gameStatus = document.querySelector(".winner");
//game over boolean
let isGameOver = false
let counter = 0;
//colors
const colors =[
    "#1505fc", 
    "#ffc403", 
    "#0313ff", 
    "#a703ff",
    "#6305f0",
    "#c9f007",
    "#dcf500",
    "#9107fa",
    "#c9f007"
]
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
        const choice = document.getElementById("choice").innerHTML
        console.log("IT IS WORKING: " +choice)
        const img = new Image()
        if(choice === "mario"){
            img.src = "image/mario_miner.png"
            this.chosenAvatar = img
        }else if(choice === "anonymous"){
            img.src = "image/anonymous_miner.png"
            this.chosenAvatar = img
        }else{
            img.src = "image/mario_miner.png"
            this.chosenAvatar = img
        }
            
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

//class mebreq
class Mebreq{
    constructor(mebreqX, mebreqY, mebreqWidth, mebreqHeight){
        this.mebreqX = mebreqX
        this.mebreqY = mebreqY
        this.mebreqWidth = mebreqWidth
        this.mebreqHeight = mebreqHeight
        const img = new Image()
        img.src = "image/mebreq.png"
        this.mebreqImg = img
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
        img.src = "image/nugget_light_32x32.png"
    }
}

//GoldMiner class
class GoldMiner{
    //miner object is initialized in this class
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.miner = new Miner(0, 0, canvasWidth / 10, canvasHeight / 10)
        this.mebreq = new Mebreq(0, 0, canvasWidth /2, canvasHeight /2)
        this.nuggets = []
        this.distributeNuggets()
    }

    //drawing miner avatar in the canvas
    //uses the instance of the miner class
    drawMiner(context){
        context.drawImage(this.miner.chosenAvatar, this.miner.minerX, 
            this.miner.minerY, this.miner.minerWidth, this.miner.minerHeight)
    }

    //draw mebreq
    drawMebreq(context){
        context.drawImage(this.mebreq.mebreqImg, this.mebreq.mebreqX, 
            this.mebreq.mebreqY, this.mebreq.mebreqWidth, this.mebreq.mebreqHeight)
    }
    //draws and distributes nuggets in the canvas
    distributeNuggets(){
        this.nuggets = []
        //number of nuggets to be distributed in the canvas
        let nOfNuggets = Math.floor(Math.random()) + 8
        let nuggetX
        let nuggetY
        let nuggetWidth = 11
        let nuggetHeight = 11
        let factorX = this.canvasWidth - nuggetWidth
        let factorY = this.canvasHeight - nuggetHeight
        //producing nuggets
        let index = 0
        while(index <= nOfNuggets){
            nuggetX = Math.floor(Math.random() * factorX)
            nuggetY = Math.floor(Math.random() * factorY)
            //pushing objects of nuggets in to nuggets array
            this.nuggets.push({index : new Nugget(nuggetX, nuggetY, nuggetWidth, nuggetHeight)} )
            index++
        }
    }

    drawNuggets(context){
        let nuggetX
        let nuggetY
        let nuggetWidth
        let nuggetHeight
        
        let index = 0
        while(index < this.nuggets.length){
            nuggetX = this.nuggets[index].index.nuggetX
            nuggetY = this.nuggets[index].index.nuggetY
            nuggetWidth = this.nuggets[index].index.nuggetWidth
            nuggetHeight = this.nuggets[index].index.nuggetHeight
            context.drawImage(imageMaker(canvasWidth, canvasHeight), nuggetX, nuggetY, nuggetWidth, nuggetHeight)
            index++
        }

    }
    //adds or substructs a pre determined distance value 
    //on to the x and y postions of the avatar then compares it
    //with the nugget x & y position to check if there is a position overlap
    goldSensor(context, nextX, nextY){
       
        let goldMined = false
        let rightMinerPos = nextX + this.miner.minerWidth 
        let leftMinerPos = nextX 
       
        //iterate each object, get the nuggetX and Nugget Y positions 
        //compare it with the calculated values
        this.nuggets.forEach((nugget, index) => {
            if(rightMinerPos >= nugget.index.nuggetX && leftMinerPos <= nugget.index.nuggetX + nugget.index.nuggetWidth){
                goldMined = true
            }
        })
        return goldMined
    }
}

//decides which image to be drawn into the canvas at runtime
//based on the canvasWidth and canvasHeight parameters
function imageMaker(canvasWidth, canvasHeight){
    const img = new Image()
    if(canvasWidth <= 400 && canvasHeight <= 400){
        img.src = "image/nugget_light_32x32.png"
    }
    else{
        img.src = "image/nugget_dark_32x32.png"
    }
    return img
}

//color switcher
const colorSwitcher = () => {
    if(playOn){
       
        if(counter < colors.length){
             document.querySelector(".canvas-holder").style.backgroundColor = colors[counter];
             counter++;
         }else if(counter === colors.length){
             counter = 0
             document.querySelector(".canvas-holder").style.backgroundColor = colors[counter];
             counter++
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

setInterval(function() {
    colorSwitcher()
}, 1000)


playbtn.addEventListener('click', () => {
    //setInterval will return a timer id
  playOn = true
  isGameOver = false
  timerId = setInterval(decrementTimer, 1000);
  decrementTimer();
  playbtn.style.display = "none";
})

const decrementTimer = () => {
    if(timeRemaining > 0){
        --timeRemaining
        clockTicking.innerHTML = timeRemaining;
        let temp = clockTicking.innerHTML
        scoreMaker()
    }else{
        playOn = false
    }
}

const gameOver = () => {
   
    clearInterval(timerId)
   
    if(score >= winScore){
        isGameOver = true;
        //document.querySelector(".canvas-holder").style.backgroundColor = "#ba4ff0";
        clockTicking.innerHTML = "YOU WON"
        isGameOver =false
    }else{
        isGameOver = true;
        //document.querySelector(".canvas-holder").style.backgroundColor = "#c9f007";
        clockTicking.innerHTML = "TRY AGAIN"
        isGameOver =false
    }
    scoreText.innerHTML = 0;
    score = 0
    timeRemaining = 15;
    playOn = false;
}

 const maximumScoreSetter = (score) => {
    if(score > winScore){
        score = winScore
    }
    let maximum = maxScoreMaker(score)
    let name = localStorage.getItem("choice")
    switch(name){
        case 'mario':
            localStorage.setItem("mario-score", maximum)
            break
        case 'anonymous':
            localStorage.setItem("anonymous-score", maximum)
    }
}
 
 //score maker updates the score element
 const scoreMaker = () => {
    if(score < winScore && timeRemaining != 0 && playOn && gotGold){
        score += 15
        scoreText.innerHTML = score
        // setTimeout(() => {
        //     colorSwitcher()
        // }, 1000);
        
    }else if(score >= winScore && timeRemaining != 0 && playOn){
        gameOver()
        playbtn.style.display = "inline-block";
        playbtn.innerHTML = "Play Again"
        //document.querySelector(".canvas-holder").style.backgroundColor = "#ba4ff0";
    }else if(score < winScore && timeRemaining === 0){
        gameOver()
        playbtn.style.display = "inline-block";
        playbtn.innerHTML = "Play Again"
        //document.querySelector(".canvas-holder").style.backgroundColor = "#c9f007";
    }else{
        clockTicking.innerHTML = timeRemaining;
    }
    maximumScoreSetter(score)
    if(playOn){
      setTimeout(() =>{
        initilizeCanvas()
      }, 5000)
      clearTimeout()
    }
 }

 //records the maximum score
 const maxScoreMaker = (score) => {
    let currentMax = document.getElementById("gold-score-max").innerHTML;
   
    if(score >= currentMax) {
        if(score != 0){
            currentScore.innerHTML = score
        }
        console.log("CurrentScore: " +currentScore.innerHTML);
        maxScore = score
        maxScoreText.innerHTML = maxScore
        console.log("MAX SCORE IS : " +maxScore)
    }
    if(score < currentMax){
        if(score != 0){
            currentScore.innerHTML = score
        }
        console.log("CurrentScore: " +currentScore.innerHTML);
        maxScore = currentMax
        maxScoreText.innerHTML = maxScore
       
    }
    return maxScore
 }

//this event lives on the window and waits
//for an event to resize the canvas and calls seupcanvas() 
//function
window.addEventListener("resize", initilizeCanvas)

// event handlers
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("touchstart", touchHandler);
// document.addEventListener("touchmove", touchHandler);

const senseGold = () => {
    gotGold = goldMiner.goldSensor(context, goldMiner.miner.minerX, goldMiner.miner.minerY)
    console.log("GOT GOLD " +gotGold)
    if(gotGold && playOn){
        scoreMaker()
        mebreqSound()
        gotGold = false
    }
}
 // keyboard down handler
 function keyDownHandler(e) {
     senseGold()
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

//mobile touchHandler
//touch support coming in version2
// function touchHandler(e){
//     if(e.touches){
//         goldMiner.miner.minerX = e.touches[0].pageX - canvas.offsetLeft - goldMiner.miner.minerWidth / 2;
//         goldMiner.miner.minerY = e.touches[0].pageY - canvas.offsetTop - goldMiner.miner.minerHeight / 2;
//         output.textContent = `Touch:  x: ${goldMiner.miner.minerX}, y: ${goldMiner.miner.minerY}`;
//         e.preventDefault();
//     }
// }

//when key is pressed it controls
//the direction and the speed of the avator 
 function keyBoardMoves(){
     // keyboard moves
     if(playOn){
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
 }

 function clean(){
    //clean canvas function
    context.fillRect(0, 0, canvas.width, canvas.height)
    //context.clearRect(0, 0, canvas.width, canvas.height)
 }

 // background music player
 function soundTrack(){
    let yeshuaMas = document.querySelector('#audio')
    yeshuaMas.play()
 }
 
 const mebreqSound = () => {
    let mebreq = document.querySelector('#mebreq')
    mebreq.play()
 }
 // draw function
 function miningLoop() {
     clean()
     goldMiner.drawMiner(context)
     goldMiner.drawNuggets(context)
     soundTrack()
    //  if(isGameOver){
    //     document.querySelector(".canvas-holder").style.backgroundColor = "#ba4ff0";
        
    //     document.querySelector(".canvas-holder").style.backgroundImage = "url('image/someimage.png')"

    //     could not get suitable image to draw lighting effect on to the canvas
    //     goldMiner.drawMebreq(context)
    //  }
     
     //drawMiner(): depreciated 
     keyBoardMoves()
     //requestAnimationFrame calls the miningLoop func. when it has 
     //a new frame that can be drawn to
     requestAnimationFrame(miningLoop);
    }

 // drawing continue
 miningLoop();