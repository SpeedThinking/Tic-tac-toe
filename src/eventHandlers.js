import { updateWinPage, setUp } from './gameLogic.js';

window.addEventListener('load', () => {
  updateWinPage();
  setUp();
});

const allImages = document.querySelectorAll('img');
allImages.forEach(image => {
  image.addEventListener('dragstart', (event) => {
    event.preventDefault();
  });
});

