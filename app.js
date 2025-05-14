let gameSeq = [];
let userSeq = [];

let score = [];

let level = 0;
let started = false;

let btns = ["red", "yellow", "green", "purple"];
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    let h2 = document.createElement("h2");
    h2.innerText = "Game Started!";
    h1.insertAdjacentElement("afterend", h2);
    started = true;

    leveUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");

  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");

  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function leveUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randCol = btns[randIdx];
  let randbtn = document.querySelector(`.${randCol}`);

  gameFlash(randbtn);

  gameSeq.push(randCol);
  // console.log(gameSeq);
}

function check(idx) {
  if (userSeq[idx] == gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(leveUp, 1000);
    }
  } else {
    h1.nextElementSibling.remove();
    h2.innerHTML = `Game Over! Your Score was <b>${
      level - 1
    }</b> <br> Press any key to restart`;
    score.push(level - 1);
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    let h3 = document.querySelector("h3");
    h3.innerText = `Highest Score : ${Math.max(...score)}`;
    reset();
  }
}

function btnPress() {
  if (started == false) {
    h2.style.color = "red";
    setTimeout(() => {
      h2.style.color = "black";
    }, 250);
  } else {
    let btn = this;
    userFlash(btn);

    let userColr = btn.getAttribute("id");
    userSeq.push(userColr);

    check(userSeq.length - 1);
  }
}

let allbtns = document.querySelectorAll(".btn");

for (btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  gameSeq = [];
  userSeq = [];
  level = 0;

  started = false;
}
