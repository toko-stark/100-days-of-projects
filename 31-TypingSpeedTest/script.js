const sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once.",
    "Programming is the art of telling a computer what to do through a series of instructions. It requires logic, creativity, and patience.",
    "JavaScript is a versatile programming language that powers the interactive elements of websites. It makes web pages dynamic and engaging.",
    "Practice makes perfect when it comes to typing. The more you type, the faster and more accurate you become over time.",
    "Web development combines creativity with technical skills. Every website you visit is built using HTML, CSS, and JavaScript.",
    "Learning to code opens up a world of possibilities. You can build websites, apps, games, and solve complex problems.",
    "The internet has revolutionized how we communicate, work, and learn. It connects billions of people around the world.",
    "Technology evolves rapidly, and staying current with new tools and techniques is essential for any developer.",
    "Clean code is not just about making it work, but making it readable and maintainable for yourself and others.",
    "Debugging is an essential skill for programmers. Finding and fixing errors is often more challenging than writing code."
];

let currentText = '';
let startTime = null;
let timerInterval = null;
let timeLeft = 60;
let isTestActive = false;
let correctChars = 0;
let totalChars = 0;

const textDisplay = document.getElementById('textDisplay');
const userInput = document.getElementById('userInput');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const timerDisplay = document.getElementById('timer');
const result = document.getElementById('result');

function getRandomText() {
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
}

function displayText(text) {
    textDisplay.innerHTML = '<p id="sampleText">' + 
        text.split('').map((char, index) => 
            `<span class="char" data-index="${index}">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('') + 
        '</p>';
}

function startTest() {
    if (isTestActive) return;
    
    currentText = getRandomText();
    displayText(currentText);
    
    isTestActive = true;
    timeLeft = 60;
    startTime = Date.now();
    correctChars = 0;
    totalChars = 0;
    
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    
    startBtn.disabled = true;
    resetBtn.disabled = false;
    
    result.classList.remove('show');
    
    // Update timer
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `${timeLeft}s`;
        
        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
    
    updateStats();
}

function endTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    userInput.disabled = true;
    startBtn.disabled = false;
    
    const elapsedTime = (60 - timeLeft) / 60; // in minutes
    const wpm = elapsedTime > 0 ? Math.round((correctChars / 5) / elapsedTime) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    result.textContent = `Test Complete! Final WPM: ${wpm} | Accuracy: ${accuracy}%`;
    result.className = 'result show success';
    
    // Highlight all characters
    document.querySelectorAll('.char').forEach(char => {
        char.classList.remove('current');
    });
}

function resetTest() {
    isTestActive = false;
    clearInterval(timerInterval);
    timeLeft = 60;
    startTime = null;
    correctChars = 0;
    totalChars = 0;
    
    userInput.value = '';
    userInput.disabled = true;
    
    startBtn.disabled = false;
    resetBtn.disabled = true;
    
    textDisplay.innerHTML = '<p id="sampleText">Click "Start Test" to begin!</p>';
    result.classList.remove('show');
    
    wpmDisplay.textContent = '0';
    accuracyDisplay.textContent = '100%';
    timerDisplay.textContent = '60s';
}

function updateStats() {
    if (!isTestActive || !startTime) return;
    
    const elapsedTime = (Date.now() - startTime) / 1000 / 60; // in minutes
    const wpm = elapsedTime > 0 ? Math.round((correctChars / 5) / elapsedTime) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

function checkInput() {
    if (!isTestActive) return;
    
    const input = userInput.value;
    const chars = document.querySelectorAll('.char');
    
    totalChars = input.length;
    correctChars = 0;
    
    chars.forEach((char, index) => {
        char.classList.remove('correct', 'incorrect', 'current');
        
        if (index < input.length) {
            if (input[index] === currentText[index]) {
                char.classList.add('correct');
                correctChars++;
            } else {
                char.classList.add('incorrect');
            }
        }
        
        if (index === input.length) {
            char.classList.add('current');
        }
    });
    
    // Check if user completed the text
    if (input === currentText) {
        // Get new text and continue
        currentText = getRandomText();
        displayText(currentText);
        userInput.value = '';
        totalChars = 0;
        correctChars = 0;
    }
    
    updateStats();
}

startBtn.addEventListener('click', startTest);
resetBtn.addEventListener('click', resetTest);
userInput.addEventListener('input', checkInput);

// Prevent default behavior for spacebar when test is not active
userInput.addEventListener('keydown', (e) => {
    if (!isTestActive && e.key === ' ') {
        e.preventDefault();
    }
});
