// Source :  https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection

var canvas = document.getElementById("breakoutCanvas");
var ctx = canvas.getContext("2d");

var dateObj = new Date();
var startTime =  dateObj.getTime();
var score = 0;
var finalScore = 0;
var isDead = false;
var isWon = false;
var isStarted = false;

var x = canvas.width/2;
var y = canvas.height-30;
var ballRadius = 10;
var speed = 4
var dx = Math.random()*speed;
var dy = - Math.sqrt(speed*speed - dx*dx);
var speedMagn = Math.sqrt(dx*dx + dy*dy);
var maxDx = 5;
var maxDy = 5;
var varDegree = Math.PI / 4;
var lives = 3;

var paddleHeight = 20;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

var endScrPadding = 10;
var endScrText = "Click to Restart";

canvas.addEventListener('click', function(evt) {
    if(isDead || isWon || !isStarted){
    	init();
    }
}, false)

var brickRowCount = 3;
var brickColumnCount = 8;
var brickWidth = 50;
var brickHeight = 25;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#D8960E";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#222222";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0F3283";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#222222";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        isWon = true;
                    }
                }
            }
        }
    }
}


function drawScore() {
	dateObj = new Date();
	finalScore = 500 + score*100  -  Math.round((dateObj.getTime()-startTime)/500);
    ctx.font = "16px Arial";
    ctx.fillStyle = "#222222";
    ctx.fillText("Score: "+finalScore, 8, 20);
}

function gameOver(){
	isDead = true;

}

function drawEndScreen(){

    ctx.beginPath();
    ctx.rect(endScrPadding, endScrPadding, canvas.width-endScrPadding, canvas.height-endScrPadding);
    ctx.fillStyle = "#333333";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px bold Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: "+finalScore+"\n"+endScrText ,  0.2*canvas.width, 0.5*canvas.height);

}

function drawWinScreen(){
    ctx.beginPath();
    ctx.rect(endScrPadding, endScrPadding, canvas.width-endScrPadding, canvas.height-endScrPadding);
    ctx.fillStyle = "#440044";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px bold Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(finalScore+" "+endScrText ,  0.15*canvas.width, 0.5*canvas.height);

}
function drawStartScreen(){
    ctx.beginPath();
    ctx.rect(endScrPadding, endScrPadding, canvas.width-endScrPadding, canvas.height-endScrPadding);
    ctx.fillStyle = "#440044";
    ctx.fill();
    ctx.closePath();
    ctx.font = "32px bold Arial";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Click to start" ,  0.15*canvas.width, 0.5*canvas.height);

}

function init(){
	dateObj = new Date();
	startTime =  dateObj.getTime();
	isStarted = true;
	isDead = false;
	isWon = false;
    x = canvas.width/2;
    y = canvas.height-30;
    dx = Math.random()*speed;
	dy = - Math.sqrt(speed*speed - dx*dx);
	speedMagn = Math.sqrt(dx*dx + dy*dy);
	score = 0;
	lives = 3;
	bricks = [];
	for(var c=0; c<brickColumnCount; c++) {
	    bricks[c] = [];
	    for(var r=0; r<brickRowCount; r++) {
	        bricks[c][r] = { x: 0, y: 0, status: 1 };
	    }
	}
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isDead && !isWon && isStarted){
	    drawBall();
	    drawPaddle();
	    drawBricks();
	    collisionDetection();
	    drawScore();
	    drawLives();
	    
	    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
	        dx = -dx;
	    }
	    if(y + dy < ballRadius) {
		    dy = -dy;
		} else if (y + dy > canvas.height-ballRadius-paddleHeight
					&&  x > paddleX && x < paddleX + paddleWidth) {

			dy = -dy ;

			var coefAngle = varDegree*2* ((x-paddleX)/paddleWidth - 0.5);
			var cosAngle = Math.cos(coefAngle);
			var sinAngle = Math.sin(coefAngle);
			var dx2 = cosAngle * dx - sinAngle*dy;
			var dy2 = sinAngle* dx + cosAngle*dy;
			dx = dx2;
			dy = dy2;
		} else if (y + dy > canvas.height-ballRadius) {
			lives--;
			if(!lives) {
				gameOver();
			}
			else {
			    x = canvas.width/2;
			    y = canvas.height-30;
			    
			    dx = Math.random()*speed;
				dy = - Math.sqrt(speed*speed - dx*dx);
				speedMagn = Math.sqrt(dx*dx + dy*dy);
			    // paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	    if(rightPressed && paddleX < canvas.width-paddleWidth) {
	        paddleX += 7;
	    }
	    else if(leftPressed && paddleX > 0) {
	        paddleX -= 7;
	    }
	    
	    x += dx;
	    y += dy;	
    }else if (isWon){
    	drawWinScreen();
    }else if (!isStarted){
    	drawStartScreen();
    }else if (isDead){

    	drawEndScreen();

    }
    requestAnimationFrame(draw);
}

draw();