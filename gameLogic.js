// JavaScript source code
var canvas = document.getElementById("catWorld");
var ctx = canvas.getContext("2d");

let screenWidth = 1000;
let screenHeight = 600;

class GameCharacter {
    constructor(x, y, width, height, color, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.maxSpeed = 6;
    }
}

var catPlayer = new GameCharacter(40, 300, 10, 10, "rgb(200,100,20)")

var draw = function () {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    ctx.fillStyle = catPlayer.color;

    //Player
    ctx.fillRect(catPlayer.x, catPlayer.y, catPlayer.width,catPlayer.height);
}

var step = function () {
    draw();
    window.requestAnimationFrame(step);
}
step();