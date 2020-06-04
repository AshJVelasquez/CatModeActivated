// JavaScript source code
var canvas = document.getElementById("catWorld");
var ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 600;

var isRightKeyPressed = false;
var isLeftKeyPressed = false;
var isUpKeyPressed = false;
var isDownKeyPressed = false;

class GameCharacter {
    constructor(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 4;
    }
    moveVertically() {
        if (this.y > screenHeight - 100 || this.y < 50) {
            this.speed = -this.speed;
        }
        this.y += this.speed;
    }
    moveHorizontally() {
        this.x += this.speed;
    }
}

/*------Characters-------*/
var catPlayer = new GameCharacter(40, 300, 30, 30, "rgb(200,100,20)", 0);
/*--------------------------------*/


/*------Loading Images to Canvas--------*/
var draw = function () {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    ctx.fillStyle = catPlayer.color;

    //Player
    ctx.fillRect(catPlayer.x, catPlayer.y, catPlayer.width, catPlayer.height);
}
/*--------------------------------*/


/*--------------------------------*/
//Detecting user input
document.onkeydown = function (event) {
    //BEGIN Horizontal Direction for Player
    var keyPressed = event.keyCode;
    if (keyPressed == 39) {
        isRightKeyPressed = true;
        catPlayer.speed = catPlayer.maxSpeed;
    }
    else if (keyPressed == 37) {
        isLeftKeyPressed = true;
        catPlayer.speed = -catPlayer.maxSpeed;
    }
    //END Horizonatal

    //BEGIN Vertical Direction for Player
    //NOTE Keep an eye on this cause I wonder if the y-axis is different due to the way the canvas is created
    else if (keyPressed == 38) {
        isUpKeyPressed = true;
        catPlayer.speed = catPlayer.maxSpeed;
    }
    else if (keyPressed == 40) {
        isDownKeyPressed = true;
        catPlayer.speed = -catPlayer.maxSpeed;
    }
    //END Vertical
};

document.onkeyup = function (event) {
    //player.speed = 0;
    var keyUp = event.keyCode;

    //BEGIN Stopping Horizontal Movement for Player
    if (keyUp == 39) {
        isRightKeyPressed = false;
        if (isLeftKeyPressed) {
            catPlayer.speed = -catPlayer.maxSpeed;
        }
        else {
            catPlayer.speed = 0;
        }
    }
    else if (keyUp == 37) {
        isLeftKeyPressed = false;
        if (isRightKeyPressed) {
            catPlayer.speed = catPlayer.maxSpeed;
        }
        else {
            catPlayer.speed = 0;
        }
    }
    //END Horizonatal

    //BEGIN Stopping Vertical Movement for Player
    else if (keyUp == 38) {
        isUpKeyPressed = false;
        if (isDownKeyPressed) {
            catPlayer.speed = -catPlayer.maxSpeed;
        }
        else {
            catPlayer.speed = 0;
        }
    }
    else if (keyUp == 40) {
        isDownKeyPressed = false;
        if (isUpKeyPressed) {
            catPlayer.speed = catPlayer.maxSpeed;
        }
        else {
            catPlayer.speed = 0;
        }
    }
    //END Vertical
};
/*--------------------------------*/

var movement = function () {
    catPlayer.moveHorizontally();
    catPlayer.moveVertically();
    //IDEA: make separate speeds for vertical and horizontal
}

var step = function () {
    movement();
    draw();
    window.requestAnimationFrame(step);
}
step();