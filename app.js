let gameSeq = [];
let userSeq = [];
let highestScore = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;

    h2.innerHTML = `
        Level ${level}
        <br>
        <span style="font-size:1rem">
            Highest Score: ${highestScore}
        </span>
    `;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {

    if (userSeq[idx] === gameSeq[idx]) {

        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }

    } else {

        if (level > highestScore) {
            highestScore = level;
        }

        h2.innerHTML = `
            🎮 Game Over!
            <br>
            Your Score: <b>${level}</b>
            <br>
            Highest Score: <b>${highestScore}</b>
            <br><br>
            Press Any Key To Restart
        `;

        document.body.classList.add("game-over");

        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 500);

        reset();
    }
}

function btnPress() {

    if (!started) return;

    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");

    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}