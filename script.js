const words = ['time','to','sleep','have','a','good','dream'];
let selectedWord;
let playable = true;

const correctLetters = [];
const wrongLetters = [];

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const figureParts = document.querySelectorAll('.figure-part');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
// Function to select a new word
function selectNewWord() {
	if (words.length > 0){
		const randomIndex = Math.floor(Math.random() * words.length);
        selectedWord = words[randomIndex];
        words.splice(randomIndex, 1);
	}else {
		// 如果数组为空，执行其他的代码
		finalMessage.innerText = 'No more words available!';
	  }
    
  
    
  
}

// Function to display the word
function displayWord() {
  wordEl.innerHTML = selectedWord
    .split('')
    .map(letter => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>
    `)
    .join('');

  const innerWord = wordEl.innerText.replace(/[ \n]/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 😃';
    popup.style.display = 'flex';
    playable = false;
  }
}

// Function to reset the game
function resetGame() {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectNewWord();
  displayWord();
  updateWrongLettersEl();
  if (words.length === 0) {
    finalMessage.innerText = 'No more words available!';
  }
  
  
  popup.style.display = 'none';
}

// Function to update wrong letters
function updateWrongLettersEl() {
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😕';
    popup.style.display = 'flex';
    playable = false;
  }
}

// Function to show notification
function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}


  
// Event listener for keydown
window.addEventListener('keydown', e => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();

      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersEl();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Event listener for Play Again button
playAgainBtn.addEventListener('click', resetGame);

// Initial word selection
selectNewWord();
displayWord();
updateWrongLettersEl();