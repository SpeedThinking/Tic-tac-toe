import {
    ticTacToeReplayPhrases,
    winCelebrationPhrases,
    IMAGES,
    PLAYER_X,
    PLAYER_O,
    WINNING_COMBINATIONS,
  } from './constants.js';
  import { board, boardCells, winPage, playAgainButton, winImg, winText, title, statusPlayer, playAgainText } from './elements.js';

let currentPlayer = PLAYER_X;
let isGameActive = true;

function updateWinPage() {
    resetGame();
    //random play again text
    const randomIndex = Math.floor(Math.random() * ticTacToeReplayPhrases.length);
    playAgainText.innerText = ticTacToeReplayPhrases[randomIndex];
    //random win message
    
    const randomWinMessage = Math.floor(Math.random() * winCelebrationPhrases.length);
    winText.innerText = winCelebrationPhrases[randomWinMessage];
    
}

function setUp() {
    randomTitleColor();

    winPage.addEventListener('click', (event) => {
        if (event.target === playAgainButton) {
            resetGame();
        }
    })
    board.addEventListener('click', (event) => {
        if (event.target.classList.contains('cell')) {
            play(event.target);
            }
        });
    }

function randomTitleColor() {
function changeColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    title.style.color = "#" + randomColor;
    }
      
// Call the changeColor function every 1 second (1000milliseconds)
setInterval(changeColor, 600);

}
    
function play(cell) {
    if (isGameActive && cell.innerHTML === '') { 
        cell.innerHTML = IMAGES[currentPlayer]; 
        checkWin(); 

        // Switch turns and update display
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        statusPlayer.innerText = currentPlayer;
    }
}

function checkWin() {
    for (const element of WINNING_COMBINATIONS) {
        const [a, b, c] = element;
        const cellA = boardCells[a].querySelector('img')?.getAttribute('alt');
        const cellB = boardCells[b].querySelector('img')?.getAttribute('alt');
        const cellC = boardCells[c].querySelector('img')?.getAttribute('alt');

        // Check if the cells in the combination are not empty and have the same value
        if (cellA && cellA === cellB && cellB === cellC) {
            // Win condition is met, perform actions accordingly
            winActions(cellA);
            return;
        }
    }

    // Check for a tie if no win condition is met
    if (!Array.from(boardCells).some(cell => cell.innerHTML === '')) {
        // It's a tie, perform actions accordingly
        tieActions();
    }
}

function winActions(winningPlayer) {
    winPage.style.display = 'block';
    board.parentElement.style.display = 'none';
    const winImage = document.createElement('img');
    winImage.src = `public/${winningPlayer}.svg`;
    winImage.alt = winningPlayer;
    winImage.id = 'winner-img';
    winImg.innerHTML = ''; // Clear previous content
    winImg.appendChild(winImage);

    winText.innerText = `${winningPlayer === 'X' ? 'Player X' : 'Player O'} wins!`;
    statusPlayer.parentElement.parentElement.style.display = 'none';   
     title.style.display = 'none'
}
function tieActions() {
    winPage.style.display = 'block';
    board.parentElement.style.display = 'none';
    statusPlayer.parentElement.parentElement.style.display = 'none';

    winImg.innerHTML = '<img src="public/tie.svg" alt="tie">';
    
    const tieImage = document.createElement('img');
    tieImage.src = 'public/tie.svg';
    tieImage.id = 'winner-img';
    tieImage.alt = 'tie';
    winImg.innerHTML = ''; // Clear previous content
    winImg.appendChild(tieImage);
    winText.innerText = `It's a tie! No wins!`;
    document.getElementById('title').style.display = 'none'
    
    title.style.display = 'none'

}

function resetGame() {
    Array.from(boardCells).forEach(cell => {
        cell.innerHTML = ''; // Reset cell content
    });

    // Reset game state
    currentPlayer = PLAYER_X;
    statusPlayer.innerText = currentPlayer;
    isGameActive = true;

    board.parentElement.style.display = 'table';
    winPage.style.display = 'none';
    title.style.display = 'block'
    statusPlayer.parentElement.parentElement.style.display = 'block';
}
export { updateWinPage, setUp };
