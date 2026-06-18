const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");

let score = 0;
let gameOver = false;

document.addEventListener("keydown", (e) => {
    if ((e.code === "Space" || e.code === "ArrowUp") &&
        !dino.classList.contains("jump")) {

        dino.classList.add("jump");

        setTimeout(() => {
            dino.classList.remove("jump");
        }, 500);
    }
});

const scoreInterval = setInterval(() => {
    if (!gameOver) {
        score++;
        scoreText.textContent = score;
    }
}, 100);

const collisionCheck = setInterval(() => {
    const dinoBottom =
        parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

    const cactusLeft =
        cactus.getBoundingClientRect().left -
        document.getElementById("game").getBoundingClientRect().left;

    if (cactusLeft < 90 && cactusLeft > 20 && dinoBottom < 60) {
        gameOver = true;
        cactus.style.animationPlayState = "paused";
        alert(`Game Over! Score: ${score}`);
    }
}, 10);

function restartGame() {
    score = 0;
    gameOver = false;
    scoreText.textContent = 0;
    cactus.style.animationPlayState = "running";
}
