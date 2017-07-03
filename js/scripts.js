//VARIABLES
var gameCanvas = document.getElementById("graphics");
var grafx = gameCanvas.getContext('2d');
var player = new Object("img/uRight.png", 300-16, 100, 41, 68);
var playerRigth = new Object("img/uRight_Run.png", 300-16, 100, 41, 68);
var playerLeft = new Object("img/uLeft_Run.png", 300-16, 100, 41, 68);
var playerRightJump = new Object("img/uRight_Jump.png", 300-16, 100, 41, 68);
var playerLeftJump = new Object("img/uLeft_Jump.png", 300-16, 100, 41, 68);
var maxBlock = 20;
var block = new Array();
for (var i = 0; i <= 3; i++) {
    block[i] = new Object("img/block.png", i * 32, 300, 32, 36);
}
block[i] = new Object("img/block_r_edge.png", i * 32, 300, 32, 36);

block[5] = new Object("img/block_l_edge.png", 300, 300, 32, 36);
for (var i = 6; i <= maxBlock; i++) {
    block[i] = new Object("img/block.png", i * 32 +139, 300, 32, 36);
}

var isLeft = false;
var isRight = false;
var isSpace = false;
player.Gravity = 20;
player.Weight = 0.1;

//EVENTS

function keyDown(e) {
    if (String.fromCharCode(e.keyCode) == "%") isLeft = true;
    if (String.fromCharCode(e.keyCode) == "'") isRight = true;
    if (String.fromCharCode(e.keyCode) == " ") isSpace = true;
}

function keyUp(e) {
    if (String.fromCharCode(e.keyCode) == "%") isLeft = false;
    if (String.fromCharCode(e.keyCode) == "'") isRight = false;
    if (String.fromCharCode(e.keyCode) == " ") isSpace = false;
}

//MAINLOOP
MainLoop();

function MainLoop() {
    //PRE VERIABLE ADJUSTMNETS
    for (var i=0;i<=maxBlock;i++) block[i].X += -player.Velocity_X;
    player.Y += player.Velocity_Y;


    //LOGIC
    if (isLeft) player.Velocity_X = -3;
    if (isRight) player.Velocity_X = 3;
    if (!isLeft && !isRight && player.Velocity_Y == 0) player.Velocity_X = 0;

    if (player.Velocity_Y < player.Gravity) player.Velocity_Y += player.Weight;
    for (var i = 0; i <= maxBlock; i++) {
        if (player.isColliding(block[i]) && player.Y + player.Height < block[i].Y + player.Velocity_Y) {
            player.Y = block[i].Y - player.Height;
            player.Velocity_Y = 0;
        }
    }
    if (isSpace && player.Velocity_Y == 0) {
        player.Velocity_Y = -5;
    }

    //POST VARIABLE ADJUSTMNETS

    //RENDERING ADJUSTMNETS
    grafx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    for (var i = 0; i <= maxBlock; i++) grafx.drawImage(block[i].Sprite, block[i].X, block[i].Y);
    if(isRight && !isSpace) {
    	grafx.drawImage(playerRigth.Sprite, player.X, player.Y);
    } if (isLeft && !isSpace) {
    	grafx.drawImage(playerLeft.Sprite, player.X, player.Y);
    } if (isRight && isSpace && !isLeft|| isSpace && !isLeft) {
    	grafx.drawImage(playerRightJump.Sprite, player.X, player.Y);
    } if (isLeft && isSpace) {
    	grafx.drawImage(playerLeftJump.Sprite, player.X, player.Y);
    } if (!isRight && !isLeft & !isSpace) {
    	grafx.drawImage(player.Sprite, player.X, player.Y);
    }
    setTimeout(MainLoop, 1000 / 60);
}

function Object(img, x, y, width, height) {
    this.Sprite = new Image();
    this.Sprite.src = img;
    this.X = x;
    this.Y = y;
    this.Width = width;
    this.Height = height;
    this.Previous_X;
    this.Previous_Y;
    this.Velocity_X = 0;
    this.Velocity_Y = 0;
    this.Gravity = 0;
    this.Weight = 0;


    this.isColliding = function(obj) {
        if (this.X > obj.X + obj.Width) return false;
        if (this.X + this.Width < obj.X) return false;
        if (this.Y > obj.Y + obj.Height) return false;
        if (this.Y + this.Height < obj.Y) return false;
        return true;
    }
}
