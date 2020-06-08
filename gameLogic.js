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
        this.tossedVertically = false;
        this.tossedHorizontally = false;
    }

    horizontalMovement() {
        if (this.tossedHorizontally) {
            if (catPlayer.horizontalSpeed > 0) {
                while (this.x<screenWidth-this.width) {
                    this.x += 3;
                }
                this.tossedHorizontally = false;
            }
            else if (catPlayer.horizontalSpeed < 0) {
                while (this.x > 0) {
                    this.x -= 3;
                }
                this.tossedHorizontally = false;
            }
        }
    }
    verticalMovement() {
        if (this.tossedVertically) {
            if (catPlayer.verticalSpeed > 0) {
                while (this.y > 0) {
                    this.y -= 3;
                }
                this.tossedVertically = false;
            }
            else if (catPlayer.verticalSpeed < 0) {
                while (this.y < screenHeight - this.height) {
                    this.y += 3;
                }
                this.tossedVertically = false;
            }
        }
    }
}

/*------Characters-------*/
var catPlayer = new GameCharacter(60, 300, 30, 30, "rgb(200,100,20)", 0, 0); //orange
/*--------------------------------*/

/*----------------Objects----------*/
var table = new GameObject(screenWidth / 2, 300, 100, 20, "rgb(0,0,200)"); //blue
var tableLegLeft = new GameObject(screenWidth / 2, 320, 10, 60, "rgb(0,0,200");//blue
var tableLegRight = new GameObject((screenWidth / 2) + 90, 320, 10, 60, "rgb(0,0,200");//blue
var vase = new GameObject((screenWidth / 2) + 50, 250, 20, 50, "rgb(0,200,0)"); //green
/*--------------------------------*/


/*------Loading Images to Canvas--------*/
var draw = function () {
    ctx.clearRect(0, 0, screenWidth, screenHeight);

    //Player
    ctx.fillStyle = catPlayer.color;
    ctx.fillRect(catPlayer.x, catPlayer.y, catPlayer.width, catPlayer.height);
    //Table
    ctx.fillStyle = table.color;
    ctx.fillRect(table.x, table.y, table.width, table.height);
    ctx.fillRect(tableLegLeft.x, tableLegLeft.y, tableLegLeft.width, tableLegLeft.height);
    ctx.fillRect(tableLegRight.x, tableLegRight.y, tableLegRight.width, tableLegRight.height);
    //Vase
    ctx.fillStyle = vase.color;
    ctx.fillRect(vase.x, vase.y, vase.width, vase.height);
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

/*------------CollisionTest-----------*/
var checkCollision = function (rect1, rect2) {
    var xOverLap = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.width, rect2.width);
    var yOverLap = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.height, rect2.height);
    return xOverLap && yOverLap;
}
/*-----------------------------------*/

/*-------------Cat Attack---------------*/
var movement = function () {
    if (checkCollision(catPlayer, vase)) {
        vase.tossedHorizontally = true;
        vase.tossedVertically = true;
        vase.horizontalMovement();
        vase.verticalMovement();
    }
    catPlayer.moveHorizontally();
    catPlayer.moveVertically();
}
/*-------------------------------------*/

var step = function () {
    movement();
    draw();
    window.requestAnimationFrame(step);
}
step();