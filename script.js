'use strict';

//Elements
const newGameEl = document.querySelector('.new_game');
const headerEl = document.querySelector('.top');

const gameEl = document.querySelector('.tick');
const oneEl = document.querySelector('.one');
const twoEl = document.querySelector('.two');
const threeEl = document.querySelector('.three');
const fourEl = document.querySelector('.four');
const fiveEl = document.querySelector('.five');
const sixEl = document.querySelector('.six');
const sevenEl = document.querySelector('.seven');
const eightEl = document.querySelector('.eight');
const nineEl = document.querySelector('.nine');

const playerEl = document.querySelector('.player');
const player1El = document.querySelector('.player1');
const player2El = document.querySelector('.player2');

const messageEl = document.querySelector('.message');

//Variables:

let current,
  gameState = 0,
  checkO = [],
  checkX = [];

const boxEl = [
  oneEl,
  twoEl,
  threeEl,
  fourEl,
  fiveEl,
  sixEl,
  sevenEl,
  eightEl,
  nineEl,
];
const order = [8, 1, 6, 3, 5, 7, 4, 9, 2];

const value = new Map();
for (let i = 0; i < 9; i++) {
  value.set(boxEl[i], order[i]);
}

//Functions:
const currentChange = function () {
  if (current === 'X') {
    current = 'O';
  } else {
    current = 'X';
  }
};

//Starting condition function:
const initial = function () {
  current = 'X';
  player1El.classList.add('current');
  player2El.classList.remove('current');
  messageEl.classList.add('hidden');
  for (let i = 0; i < 9; i++) {
    boxEl[i].textContent = '';
    boxEl[i].classList.remove('straight');
    boxEl[i].classList.remove('vertical');
    boxEl[i].classList.remove('diagonal-right');
    boxEl[i].classList.remove('diagonal-left');
  }
  gameState = 1;
};

initial();

//New Game:
newGameEl.addEventListener('click', initial);

//Displaying: X and O
const display = function (box) {
  if (box.target.textContent === '') {
    box.target.textContent = current;
    winner();
    if (gameState) {
      currentChange();
      player1El.classList.toggle('current');
      player2El.classList.toggle('current');
    }
  }
  if (current === 'O') {
    const boxComputer = callComputer();
    if (boxComputer.textContent === '') {
      boxComputer.textContent = current;
      winner();
      if (gameState) {
        currentChange();
        player1El.classList.toggle('current');
        player2El.classList.toggle('current');
      }
    }
  }
};

//Function used to check winner
const triplets = function (ele) {
  let e = [];
  for (const x of ele) {
    e.push(value.get(x));
  }
  //console.log(e);
  for (let i = 0; i < e.length; i++) {
    for (let j = i + 1; j < e.length; j++) {
      for (let k = j + 1; k < e.length; k++) {
        if (e[i] + e[j] + e[k] === 15) {
          return [e[i], e[j], e[k]];
        }
      }
    }
  }
  return 0;
};

//Checking winner fucntion:
const winner = function () {
  let final = 0;
  for (let i = 0; i < 9; i++) {
    if (boxEl[i].textContent === 'X') {
      checkX.push(boxEl[i]);
    } else if (boxEl[i].textContent === 'O') {
      checkO.push(boxEl[i]);
    }
  }
  checkX = [...new Set(checkX)];
  checkO = [...new Set(checkO)];
  //console.log(checkX);
  //console.log(checkO);
  if (current === 'X') {
    final = triplets(checkX);
  } else if (current === 'O') {
    final = triplets(checkO);
  }
  if (final === 0) {
    checkO.splice(0, checkO.length);
    checkX.splice(0, checkX.length);
    checkdraw();
    return 0;
  } else {
    gameState = 0;
    line(final);
    player1El.classList.remove('current');
    player2El.classList.remove('current');
    showMessage();
    messageEl.classList.remove('hidden');
    checkO.splice(0, checkO.length);
    checkX.splice(0, checkX.length);
  }
};

//Message function:
const showMessage = function () {
  if (current === 'X') {
    messageEl.textContent = 'Player 1 Won🎉';
  } else if (current === 'O') {
    messageEl.textContent = 'Computer Won❌';
  } else {
    messageEl.textContent = 'It is a DRAW❗❗';
  }
};

//Controlling 9 boxes:
for (let i = 0; i < 9; i++) {
  boxEl[i].addEventListener('click', (e) => {
    if (gameState) {
      display(e);
    }
  });
}

//Displaying Winner:
const line = function (arr) {
  console.log(arr);
  let str = arr.join('/');
  if (str === '8/1/6' || str === '3/5/7' || str === '4/9/2') {
    straight(arr);
  } else if (str === '8/3/4' || str === '1/5/9' || str === '6/7/2') {
    vertical(arr);
  } else if (str === '8/5/2') {
    diagonalLeft(arr);
  } else if (str === '6/5/4') {
    diagonalRight(arr);
  }
};

const straight = function (a) {
  for (let i = 0; i < 3; i++) {
    boxEl[order.indexOf(a[i])].classList.add('straight');
  }
};

const vertical = function (a) {
  for (let i = 0; i < 3; i++) {
    boxEl[order.indexOf(a[i])].classList.add('vertical');
  }
};

const diagonalLeft = function (a) {
  for (let i = 0; i < 3; i++) {
    boxEl[order.indexOf(a[i])].classList.add('diagonal-left');
  }
};
const diagonalRight = function (a) {
  for (let i = 0; i < 3; i++) {
    boxEl[order.indexOf(a[i])].classList.add('diagonal-right');
  }
};

//Checking draw:
const checkdraw = function () {
  let s = 0;
  for (let i = 0; i < 9; i++) {
    if (!(boxEl[i].textContent === '')) {
      s++;
    }
  }
  if (s === 9) {
    gameState = 0;
    player1El.classList.remove('current');
    player2El.classList.remove('current');
    current = 'draw';
    showMessage();
    messageEl.classList.remove('hidden');
    checkO.splice(0, checkO.length);
    checkX.splice(0, checkX.length);
  }
};

//Match Map:
const match = new Map([
  [8, 0],
  [1, 1],
  [6, 2],
  [3, 3],
  [5, 4],
  [7, 5],
  [4, 6],
  [9, 7],
  [2, 8],
  [10, 10],
]);

//Computer Playing:
const callComputer = function () {
  let num = 10;
  /*
  // For medium and easy level
  num = Math.trunc(Math.random() * 9);
  console.log(1);
  while (boxEl[num].textContent !== '') {
    num = Math.trunc(Math.random() * 9);
  }*/
  //For Hard level
  for (let i = 0; i < 9; i++) {
    if (boxEl[i].textContent === 'X') {
      checkX.push(value.get(boxEl[i]));
    } else if (boxEl[i].textContent === 'O') {
      checkO.push(value.get(boxEl[i]));
    }
  }
  checkX = [...new Set(checkX)];
  checkO = [...new Set(checkO)];
  if (num === 10) {
    num = match.get(valueChecker(checkO));
  }
  if (num === 10) {
    num = match.get(valueChecker(checkX));
  }
  if (num === 10) {
    if (boxEl[4].textContent === '') {
      num = 4;
    }
  }
  if (num === 10) {
    num = cornerOrSide([0, 2, 6, 8]);
  }
  if (num === 10) {
    num = cornerOrSide([1, 3, 5, 7]);
  }
  console.log(num);
  return boxEl[num];
};

//Triplets:
const valueChecker = function (check) {
  for (let i = 0; i < check.length; i++) {
    for (let j = i + 1; j < check.length; j++) {
      for (let k = 1; k <= 9; k++) {
        if (check[i] + check[j] + k === 15) {
          if (boxEl[match.get(k)].textContent === '') {
            return k;
          }
        }
      }
    }
  }
  return 10;
};
const cornerOrSide = function (sel) {
  let candidate = [];
  for (let i = 0; i < 4; i++) {
    if (boxEl[sel[i]].textContent === '') {
      candidate.push(sel[i]);
    } else {
      continue;
    }
  }
  return candidate[Math.trunc(Math.random() * candidate.length)];
};
