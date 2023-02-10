
# Project Overview

# The-Gold-Miner
The Gold Miner: Project I

**Project description:** 

A Gold Miner Game that enables the player to travel around the world and mine for gold.

## Trello
   https://trello.com/invite/b/jukR1qsi/ATTId01e433e81a4ff172ea6588ccc9b020bE5822A77/the-gold-miner

## Figma

- first page https://www.figma.com/file/K6Y1sWooUYtZ1IJvPUFd1i/Game-Entry?node-id=0%3A1&t=4iSDfGYyXsiGTo2h-1
- start page https://www.figma.com/file/K6Y1sWooUYtZ1IJvPUFd1i/Game-Entry?node-id=1%3A16&t=4iSDfGYyXsiGTo2h-1
- playing and scoring https://www.figma.com/file/K6Y1sWooUYtZ1IJvPUFd1i/Game-Entry?node-id=1%3A53&t=4iSDfGYyXsiGTo2h-1

## Components

- Look into the figma links above also:
  - head to contain title and links such as google font api, js file and css file
  - body to contain title, subtitle and canvas (i.e. actual game play area or in this particular game mining zone) 
  - footer to contain copyright information 

### MVP

- The game must have play button 
- the game must have quit button
- when player press play button then play mode must be activated 
- when player press quit button game window must close
- when play is pressed the next stage must show the mission of the game for the player
- the player must be able to choose player
- once the player read the mission and decided on the avatar choice then play mode must be activated
- the avatar must make right, left, top, and bottom movements using keyboard 
- also player can use mouse to move the avatar in all directions
- background music must play to make the game interesting
- when player start playing, the game must count the score of the player which is based on the amount of gold collected
- the game also must show max score after finishing playing

## Additional Requirements

- also player can use mouse to move the avatar in all directions
- background music must play to make the game interesting

## Wireframe: Priority Matrix
   
   https://wireframe.cc/QVWKgN


## Project Schedule

|  Day | Activities | Done
|---|---| ---|
|Feb 2| Brainstorming / Writing Pseudocodes / Identifying All Constraints | Yes
|Feb 3| Setting up framework and making good starting pages/ Testing if each components are functioning with out error | Yes
|Feb 4| Implementing Javascript API for desktop mouse and keyboard controls | Yes
|Feb 5| Mapping Cells in the canvas for gold search functionalities  | Not Yet
|Feb 6| ... | ...


## Additional Libraries Plugins and APIs

- Desktop mouse and keyboard controls Javascript API - used to control keyboard and mouse movements 
- Google font API - used for styling fonts 



## Problems and Solutions 

- Problem with rendering drawings on the canvas correctly - solved 
- Getting free version logo and icon maker - not really free versions were not good enough

## Code Snippet

Smooth implementation of functionalities and calling them at runtime


```

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

```

## Surge Deployment Link

- Home Page: https://gold-miner.surge.sh/home.html
- Avatar Page: https://gold-miner.surge.sh/avatar.html
- Mining (Gaming) Page: https://gold-miner.surge.sh/index.html

## Change Log
- MVP and all STRETCHED GOALS and BEYOND that more additional features added. 

## NOTICE 
- I have used external Libraries, APIS, and other resources to accomplish this.

## Report Format Example
- Taken from the Teacher's repository. 
- All REFERENCES and RESOURCES used can found in "references.json" file.
