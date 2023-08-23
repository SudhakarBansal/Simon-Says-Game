let btns = ["purple", "yellow", "green", "blue"];
let h2 = document.querySelector("h2");
let startbtn = document.getElementById("start");
let level = 0;
let highScore = 0;
let started = false;
let gameSeq = [];
let userSeq = [];

startbtn.addEventListener("click", function (){             //to start Game on clicking button
    if (started == false) {
        started = true;
        levelup();
    }
})

function gameFlash(btn)                                    // to flash the btn chosen by the game
{
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500)
}

function userFlash(btn)                                    // to flash btn chosen by user
{
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 500)
}

function levelup() {                                      // To move to next Level
    userSeq = [];
    level++;
    h2.innerHTML = `level ${level} `;
    let randIdx = Math.floor(Math.random() * 4);         //to choose random index from 0 to 3;
    let randColor = btns[randIdx];                       // to choose the color for button
    let randBtn = document.querySelector(`.${randColor}`); //Now the random btn is selected
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelup, 2000);
        }
    }
    else {
        if (highScore < level - 1)                      //compares score to highscore
        {
            highScore = level - 1;
            
        }
        h2.innerHTML = `Game Over!<br><br>Your score : <b>${level - 1}</b> &emsp; &emsp; Highest score : <b>${highScore}</b>`;
        document.querySelector("body").style.backgroundColor = "red"; // when game over body turns red
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "#181818";
            document.getElementsByClassName('btn-container')[0].classList.add('inactive');
        }, 350);
        setTimeout(() => {
            setTimeout(() => {
                reset();
            }, 2000);
            h2.innerHTML = "Game Restarted...";
            document.getElementsByClassName('btn-container')[0].classList.remove('inactive');
        }, 5000);
    }
}

function btnPress() {                                       //tracks the btn clicked by user and adds that to usersequence for checking 
    let btn = this;                                         //btn now stores the button that was clicked
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1); //for matching
}

let allBtns = document.getElementsByClassName("btn");     //adding event listener to all the btns
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);              // when the user clicks btn on screen
}

function reset()                                         // to reset the game
{
    h2.innerHTML = "Press Start Button";
    started = false;
    level = 0
    gameSeq = [];
    userSeq = [];
}
