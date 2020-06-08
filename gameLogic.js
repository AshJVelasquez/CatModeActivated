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
    constructor(x, y, width, height, color, verticalSpeed,horizontalSpeed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        //this.speed=speed;
        this.verticalSpeed = verticalSpeed;
        this.horizontalSpeed = horizontalSpeed;
        this.maxSpeed = 4;
    }
    moveVertically() {
        if (this.y > screenHeight - 30 || this.y < 20) {
            //this.speed = -this.speed;
            this.verticalSpeed = -this.verticalSpeed;
        }
        //this.y += this.speed;
        this.y += this.verticalSpeed;
    }
    moveHorizontally() {
        //this.x += this.speed;
        if (this.x > screenWidth - 30 || this.x < 20) {
            this.horizontalSpeed = -this.horizontalSpeed;
        }
        this.x += this.horizontalSpeed;
    }
}

class GameObject {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

/*------Characters-------*/
var catPlayer = new GameCharacter(60, 300, 30, 30, "rgb(200,100,20)", 0, 0); //orange
/*--------------------------------*/

/*----------------Objects----------*/
var table = new GameObject(screenWidth / 2, 300, 100, 20, "rgb(0,0,200)"); //blue
var tableLegLeft = new GameObject(screenWidth / 2, 320, 10, 60, "rgb(0,0,200");//blue
var tableLegRight = new GameObject((screenWidth / 2)+90, 320, 10, 60, "rgb(0,0,200");//blue
/*--------------------------------*/


/*------Loading Images to Canvas--------*/
var draw = function () {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    //Player
    ctx.fillStyle = catPlayer.color;
    ctx.fillRect(catPlayer.x, catPlayer.y, catPlayer.width, catPlayer.height);
    //object
    ctx.fillStyle = table.color;
    ctx.fillRect(table.x, table.y, table.width, table.height);
    ctx.fillRect(tableLegLeft.x, tableLegLeft.y, tableLegLeft.width, tableLegLeft.height);
    ctx.fillRect(tableLegRight.x, tableLegRight.y, tableLegRight.width, tableLegRight.height);
}
/*--------------------------------*/


/*--------------------------------*/
//Detecting user input
document.onkeydown = function (event) {
    //BEGIN Horizontal Direction for Player
    var keyPressed = event.keyCode;
    if (keyPressed == 39) {
        isRightKeyPressed = true;
        catPlayer.horizontalSpeed = catPlayer.maxSpeed;
    }
    else if (keyPressed == 37) {
        isLeftKeyPressed = true;
        catPlayer.horizontalSpeed = -catPlayer.maxSpeed;
    }
    //END Horizonatal

    //BEGIN Vertical Direction for Player
    else if (keyPressed == 38) {
        isUpKeyPressed = true;
        catPlayer.verticalSpeed = -catPlayer.maxSpeed;
    }
    else if (keyPressed == 40) {
        isDownKeyPressed = true;
        catPlayer.verticalSpeed = catPlayer.maxSpeed;
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
            catPlayer.horizontalSpeed = -catPlayer.maxSpeed;
        }
        else {
            catPlayer.horizontalSpeed = 0;
        }
    }
    else if (keyUp == 37) {
        isLeftKeyPressed = false;
        if (isRightKeyPressed) {
            catPlayer.horizontalSpeed = catPlayer.maxSpeed;
        }
        else {
            catPlayer.horizontalSpeed = 0;
        }
    }
    //END Horizonatal

    //BEGIN Stopping Vertical Movement for Player
    else if (keyUp == 38) {
        isUpKeyPressed = false;
        if (isDownKeyPressed) {
            catPlayer.verticalSpeed = catPlayer.maxSpeed;
        }
        else {
            catPlayer.verticalSpeed = 0;
        }
    }
    else if (keyUp == 40) {
        isDownKeyPressed = false;
        if (isUpKeyPressed) {
            catPlayer.verticalSpeed =- catPlayer.maxSpeed;
        }
        else {
            catPlayer.verticalSpeed = 0;
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