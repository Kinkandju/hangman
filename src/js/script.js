'use strict';

//* Generating the main section
import { createElement } from './assets/modules/state_of_the_elements.js';
import { addElement } from './assets/modules/state_of_the_elements.js';

const mainElement = createElement('main', 'page__container');

const gallowsSection = createElement('section', 'page__gallows gallows');
const gallowsImage = createElement('img', 'gallows__img', { 
  src: 'assets/img/gallows-0.svg',
  alt: 'gallows image' 
});
const gallowsTitle = createElement('h1', 'gallows__title', {}, 'Hangman game');

addElement(gallowsImage, gallowsSection);
addElement(gallowsTitle, gallowsSection);

const gameSection = createElement('section', 'page__game game');
const gameList = createElement('ul', 'game__word word');

addElement(gameList, gameSection);

const gameHint = createElement('p', 'game__hint hint');
const hintWord = createElement('span', 'hint__word', {}, 'Hint:');
const hintTip = createElement('span', 'hint__tip');

addElement(hintWord, gameHint);
addElement(hintTip, gameHint);
addElement(gameHint, gameSection);

const gameGuess = createElement('p', 'game__guess guess');
const guessWords = createElement('span', 'guess__words', {}, 'Incorrect guess:');
const guessTries = createElement('span', 'guess__tries', {}, '0 / 6');

addElement(guessWords, gameGuess);
addElement(guessTries, gameGuess);
addElement(gameGuess, gameSection);

//* Generating the modal section
const modal = createElement('div', 'page__modal modal');

const modalContent = createElement('div', 'modal__content');
let modalImage = createElement('img', 'modal__img', { 
    src: 'assets/img/oh-no.gif',
    alt: 'picture with regret' 
  });
let modalTitle = createElement('h2', 'modal__title', {}, 'Game over!');

addElement(modalImage, modalContent);
addElement(modalTitle, modalContent);

let modalText = createElement('p', 'modal__text', {}, 'The correct word was:');
let modalWord = createElement('span', 'modal__word');

addElement(modalText, modalContent);

const modalButton = createElement('button', 'modal__button button', {}, 'Play again');

addElement(modalButton, modalContent);
addElement(modalContent, modal);
addElement(modal, document.body);

const resetGameKeyboard = () => {
    gameKeyboard.querySelectorAll('button').forEach(button => (button.disabled = false));
};
  
let currentWord;
let correctLetters;
let wrongGuesses;
const maxGuesses = 6;

const gameKeyboard = createElement('div', 'game__keyboard keyboard');

//* Function Reset game
import { removeClass } from './assets/modules/changing_classes.js';

const resetGame = () => {
  correctLetters = [];
  wrongGuesses = 0;

  gallowsImage.src = `assets/img/gallows-${wrongGuesses}.svg`;
  guessTries.innerText = `${wrongGuesses} / ${maxGuesses}`;

  resetGameKeyboard();

  gameList.innerHTML = currentWord.split('').map(() => `<li class="word__letter"></li>`).join('');

  removeClass(modal, 'show');
};

//* Generating random word with hint
import { wordsList } from './assets/modules/words_list.js';

function generateRandomWord() {
  const randomIndex = Math.floor(Math.random() * wordsList.length);

  const randomWord = wordsList[randomIndex].word;
  const randomHint = wordsList[randomIndex].hint;

  currentWord = randomWord;

  hintTip.innerText = randomHint;

  resetGame();
}

generateRandomWord();

//* Function Game over
import { addClass } from './assets/modules/changing_classes.js';

const endGame = isVictory => {
  setTimeout(() => {
    modalImage.src = `assets/img/${isVictory ? 'congratulations' : 'oh-no'}.gif`;
    modalTitle.innerText = isVictory ? 'You win!' : 'Game over!';
    modalText.innerText = isVictory ? 'You find the word:' : 'The correct word was:';

    addElement(modalWord, modalText);
    modalWord.innerText = currentWord;

    addClass(modal, 'show');

    if (modal.classList.contains('show')) {
        modalButton.focus();
    }
  }, 300);
};

//* Function Game start
const startGame = (button, clickedLetter) => {
  const letter = clickedLetter.toLowerCase();

  if (currentWord.includes(letter)) {
    [...currentWord].forEach((letter, index) => {
      const listItems = gameList.querySelectorAll('li');

      if (letter === clickedLetter) {
        correctLetters.push(letter);
        listItems[index].innerText = letter;

        listItems[index].classList.toggle('letter', true);
        listItems[index].classList.toggle('letter_guessed', true);
      }
    });
  } else {
    wrongGuesses += 1;

    gallowsImage.src = `assets/img/gallows-${wrongGuesses}.svg`;
  }

  button.disabled = true;
  guessTries.innerText = `${wrongGuesses} / ${maxGuesses}`;

  if (wrongGuesses === maxGuesses) {
    return endGame(false);
  }

  if (correctLetters.length === currentWord.length) {
    return endGame(true);
  }
};

const A = 97;
const Z = 122;

for (let i = A; i <= Z; i += 1) {
  const keyboardButton = createElement('button', 'keyboard__button button');
  
  const letter = String.fromCharCode(i).toLowerCase();
  keyboardButton.innerText = letter;
  keyboardButton.setAttribute('data-letter', letter);
  
  addElement(keyboardButton, gameKeyboard);
  
  keyboardButton.addEventListener('click', event => {
    const button = event.target;
    const letter = button.getAttribute('data-letter');
    startGame(button, letter);
  });
}
  
window.addEventListener('keydown', event => {
  const key = event.key.toLowerCase();

  if (/^[a-z]$/.test(key)) {
    const button = gameKeyboard.querySelector(`button[data-letter="${key}"]`);
    if (button) {
      startGame(button, key);
    }
  }
});

addElement(gameKeyboard, gameSection);

const ENTER = 13;

const handleKeyUp = event => {
  if (event.keyCode === ENTER) {
    generateRandomWord();
  }
};

if (modal.classList.contains('show')) {
  modalButton.addEventListener('keyup', handleKeyUp);
  } else if (!modal.classList.contains('show')) {
    modalButton.removeEventListener('keyup', handleKeyUp);
}

modalButton.removeEventListener('keyup', handleKeyUp);

modalButton.addEventListener('click', generateRandomWord);

addElement(gallowsSection, mainElement);
addElement(gameSection, mainElement);
addElement(mainElement, document.body);
