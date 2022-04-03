'use strict';
let dice = document.querySelector('.dice');

let p, play, current, score;

const restart = function () {
  p = 0;
  play = true;
  current = 0;
  score = [0, 0];
  dice.classList.add('hidden');
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById(`score--1`).textContent = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');
};

restart();

const checkWinner = function (x) {
  if (x >= 100) {
    document.querySelector(`.player--${p}`).classList.add('player--winner');
    document.querySelector(`.player--${p}`).classList.remove('player--active');
    play = false;
    dice.classList.add('hidden');
  }
};

const switchPlayer = function () {
  document.querySelector(`.player--${p}`).classList.remove('player--active');
  p === 0 ? (p = 1) : (p = 0);
  document.querySelector(`.player--${p}`).classList.add('player--active');
  current = 0;
};

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (play) {
    let dNumber = Math.floor(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${dNumber}.png`;
    if (dNumber === 0) {
      document.querySelector(`#current--${p}`).textContent = 0;
      switchPlayer();
    } else {
      current += dNumber;
      document.querySelector(`#current--${p}`).textContent = current;
    }
  }
});
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (play) {
    score[p] += current;
    if (current > 1) {
      document.getElementById(`score--${p}`).textContent = score[p];
      document.querySelector(`#current--${p}`).textContent = 0;
      checkWinner(document.querySelector(`#score--${p}`).textContent);
      switchPlayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', restart);
