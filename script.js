const game = document.getElementById("game");
const dino = document.getElementById("dino");
const scoreText = document.getElementById("score");
const highscoreText = document.getElementById("highscore");
const gameOverScreen = document.getElementById("gameOver");

let jumping = false;
let velocity = 0;
let gravity = 0.8;

let score = 0;
let speed = 6;
let gameOver = false;

let highscore =
    localStorage.getItem("pixelDinoHighscore") || 0;

highscoreText.textContent =
    "Best: " + highscore;

let dinoY = 20;

function jump(){

    if(jumping || gameOver) return;

    jumping = true;
    velocity = 14;
}

document.addEventListener("keydown",e=>{
    if(e.code==="Space" || e.code==="ArrowUp")
        jump();
});

document.addEventListener("touchstart",jump);

function updateDino(){

    velocity -= gravity;
    dinoY += velocity;

    if(dinoY <= 20){
        dinoY = 20;
        velocity = 0;
        jumping = false;
    }

    dino.style.bottom = dinoY + "px";
}

function createObstacle(){

    if(gameOver) return;

    const obstacle = document.createElement("div");
    obstacle.className = "obstacle";

    const height =
        Math.random() > .5 ? 50 : 70;

    obstacle.style.height = height+"px";
    obstacle.style.left = "900px";

    game.appendChild(obstacle);

    let x = 900;

    function move(){

        if(gameOver){
            obstacle.remove();
            return;
        }

        x -= speed;
        obstacle.style.left = x+"px";

        const dinoRect =
            dino.getBoundingClientRect();

        const obstacleRect =
            obstacle.getBoundingClientRect();

        if(
            dinoRect.left < obstacleRect.right &&
            dinoRect.right > obstacleRect.left &&
            dinoRect.bottom > obstacleRect.top
        ){
            endGame();
        }

        if(x < -50){
            obstacle.remove();
            score++;

            scoreText.textContent = score;

            if(score > highscore){
                highscore = score;

                localStorage.setItem(
                    "pixelDinoHighscore",
                    highscore
                );

                highscoreText.textContent =
                    "Best: " + highscore;
            }
        }else{
            requestAnimationFrame(move);
        }
    }

    move();

    const delay =
        Math.random()*1200 + 800;

    setTimeout(createObstacle, delay);
}

function endGame(){

    gameOver = true;
    gameOverScreen.style.display = "flex";
}

function restart(){

    location.reload();
}

function loop(){

    if(!gameOver){

        updateDino();

        speed += 0.0005;

        requestAnimationFrame(loop);
    }
}

createObstacle();
loop();
