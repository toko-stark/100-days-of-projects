const PROJECTS = [
  { d:1,  path:'01-RockPaperScissors', name:'Rock Paper Scissors', icon:'✊', tags:['game'] },
  { d:2,  path:'02-CharacterCounter', name:'Character Counter', icon:'🔢', tags:['tool','utility'] },
  { d:3,  path:'03-AiChatBot', name:'AI Chat Bot', icon:'🤖', tags:['tool'] },
  { d:4,  path:'04-BmiCalc', name:'BMI Calculator', icon:'⚖️', tags:['tool','utility'] },
  { d:5,  path:'05-SimonGame', name:'Simon Game', icon:'🧠', tags:['game'] },
  { d:6,  path:'06-Clock', name:'Clock', icon:'🕐', tags:['utility'] },
  { d:7,  path:'07-RandomPasswordGen', name:'Password Generator', icon:'🔐', tags:['tool','utility'] },
  { d:8,  path:'08-login-register', name:'Login / Register', icon:'👤', tags:['tool'] },
  { d:9,  path:'09-textToSpeech', name:'Text to Speech', icon:'🗣', tags:['audio','tool'] },
  { d:10, path:'10-dailyQuoteGen', name:'Daily Quote', icon:'💬', tags:['utility'] },
  { d:11, path:'11-snake', name:'Snake', icon:'🐍', tags:['game'] },
  { d:12, path:'12-Calculator', name:'Calculator', icon:'🧮', tags:['tool'] },
  { d:13, path:'13-guessTheNumber', name:'Guess The Number', icon:'🎯', tags:['game'] },
  { d:14, path:'14-toDoList', name:'To Do List', icon:'✅', tags:['tool','data'] },
  { d:15, path:'15-sortingVisualized', name:'Sorting Visualizer', icon:'📊', tags:['visual','data'] },
  { d:16, path:'16-floppyBird', name:'Floppy Bird', icon:'🐦', tags:['game'] },
  { d:17, path:'17-keyPressInfo', name:'Key Press Info', icon:'⌨️', tags:['tool'] },
  { d:18, path:'18-trafficLight', name:'Traffic Light', icon:'🚦', tags:['visual'] },
  { d:19, path:'19-connect4game', name:'Connect 4', icon:'🔴', tags:['game'] },
  { d:20, path:'20-weatherApp', name:'Weather App', icon:'⛅', tags:['tool','data'] },
  { d:21, path:'21-randomEmoji', name:'Random Emoji', icon:'😀', tags:['utility'] },
  { d:22, path:'22-musicPlayer', name:'Music Player', icon:'🎵', tags:['audio'] },
  { d:23, path:'23-movingLoginButton', name:'Moving Button', icon:'🏃', tags:['visual'] },
  { d:24, path:'24-guessTheWord', name:'Guess The Word', icon:'🔤', tags:['game'] },
  { d:25, path:'25-randomUselessFact', name:'Useless Fact', icon:'🤓', tags:['utility'] },
  { d:26, path:'26-f1ReactionTime', name:'F1 Reaction Time', icon:'🏎', tags:['game'] },
  { d:27, path:'27-randomColor', name:'Random Color', icon:'🎨', tags:['visual','utility'] },
  { d:28, path:'28-Calender', name:'Calendar', icon:'📅', tags:['utility'] },
  { d:29, path:'29-ImageCarousel', name:'Image Carousel', icon:'🖼', tags:['visual'] },
  { d:30, path:'30-AgeCalc', name:'Age Calculator', icon:'🎂', tags:['tool','utility'] },
  { d:31, path:'31-TypingSpeedTest', name:'Typing Speed Test', icon:'⌨️', tags:['game','tool'] },
  { d:32, path:'32-MemoryCardGame', name:'Memory Card Game', icon:'🃏', tags:['game'] },
  { d:33, path:'33-stopwatch', name:'Stopwatch', icon:'⏱', tags:['utility'] },
  { d:34, path:'34-countdownTimer', name:'Countdown Timer', icon:'⏳', tags:['utility'] },
  { d:35, path:'35-pomodoro', name:'Pomodoro', icon:'🍅', tags:['utility','tool'] },
  { d:36, path:'36-ticTacToe', name:'Tic Tac Toe', icon:'❌', tags:['game'] },
  { d:37, path:'37-markdownPreview', name:'Markdown Preview', icon:'📝', tags:['tool'] },
  { d:38, path:'38-qrGenerator', name:'QR Generator', icon:'📷', tags:['tool','utility'] },
  { d:39, path:'39-tipCalc', name:'Tip Calculator', icon:'💵', tags:['tool'] },
  { d:40, path:'40-currencyConverter', name:'Currency Converter', icon:'💱', tags:['tool'] },
  { d:41, path:'41-notesApp', name:'Notes App', icon:'📓', tags:['tool','data'] },
  { d:42, path:'42-paintCanvas', name:'Paint Canvas', icon:'🎨', tags:['visual','tool'] },
  { d:43, path:'43-hangman', name:'Hangman', icon:'🪢', tags:['game'] },
  { d:44, path:'44-whackAMole', name:'Whack-a-Mole', icon:'🔨', tags:['game'] },
  { d:45, path:'45-mazeGenerator', name:'Maze Generator', icon:'🌀', tags:['game','visual'] },
  { d:46, path:'46-etchASketch', name:'Etch-a-Sketch', icon:'✏️', tags:['visual'] },
  { d:47, path:'47-colorPicker', name:'Color Picker', icon:'🎨', tags:['tool','visual'] },
  { d:48, path:'48-paletteGenerator', name:'Palette Generator', icon:'🎨', tags:['visual','tool'] },
  { d:49, path:'49-gradientGenerator', name:'Gradient Generator', icon:'🌈', tags:['visual','tool'] },
  { d:50, path:'50-boxShadowGenerator', name:'Box Shadow Generator', icon:'📦', tags:['tool','visual'] },
  { d:51, path:'51-borderRadiusPreviewer', name:'Border Radius', icon:'⬜', tags:['tool','visual'] },
  { d:52, path:'52-loanCalculator', name:'Loan Calculator', icon:'🏦', tags:['tool'] },
  { d:53, path:'53-unitConverter', name:'Unit Converter', icon:'📐', tags:['tool','utility'] },
  { d:54, path:'54-stackQueueViz', name:'Stack & Queue Viz', icon:'🧱', tags:['data','visual'] },
  { d:55, path:'55-bstViz', name:'Binary Search Tree', icon:'🌳', tags:['data','visual'] },
  { d:56, path:'56-pong', name:'Pong', icon:'🏓', tags:['game'] },
  { d:57, path:'57-breakout', name:'Breakout', icon:'🧱', tags:['game'] },
  { d:58, path:'58-minesweeper', name:'Minesweeper', icon:'💣', tags:['game'] },
  { d:59, path:'59-2048', name:'2048', icon:'2️⃣', tags:['game'] },
  { d:60, path:'60-lightsOut', name:'Lights Out', icon:'💡', tags:['game'] },
  { d:61, path:'61-wordScrambler', name:'Word Scrambler', icon:'🔤', tags:['game'] },
  { d:62, path:'62-rpsls', name:'RPS Lizard Spock', icon:'🖖', tags:['game'] },
  { d:63, path:'63-diceRoller', name:'Dice Roller', icon:'🎲', tags:['utility'] },
  { d:64, path:'64-coinFlip', name:'Coin Flip', icon:'🪙', tags:['utility'] },
  { d:65, path:'65-magic8Ball', name:'Magic 8 Ball', icon:'🎱', tags:['utility'] },
  { d:66, path:'66-triviaQuiz', name:'Trivia Quiz', icon:'🧠', tags:['game'] },
  { d:67, path:'67-flashcards', name:'Flashcards', icon:'🃏', tags:['tool','data'] },
  { d:68, path:'68-recipeFinder', name:'Recipe Finder', icon:'🍳', tags:['tool','data'] },
  { d:69, path:'69-numberFacts', name:'Number Facts', icon:'🔢', tags:['utility'] },
  { d:70, path:'70-romanNumerals', name:'Roman Numerals', icon:'Ⅹ', tags:['tool'] },
  { d:71, path:'71-caesarCipher', name:'Caesar Cipher', icon:'🔐', tags:['tool'] },
  { d:72, path:'72-morseCode', name:'Morse Code', icon:'📡', tags:['tool','audio'] },
  { d:73, path:'73-anagramFinder', name:'Anagram Finder', icon:'🔁', tags:['tool'] },
  { d:74, path:'74-wordCloud', name:'Word Cloud', icon:'☁️', tags:['visual','data'] },
  { d:75, path:'75-particleTrail', name:'Particle Trail', icon:'✨', tags:['visual'] },
  { d:76, path:'76-starField', name:'Star Field', icon:'🌌', tags:['visual'] },
  { d:77, path:'77-matrixRain', name:'Matrix Rain', icon:'💚', tags:['visual'] },
  { d:78, path:'78-gameOfLife', name:"Conway's Game of Life", icon:'🦠', tags:['visual','data'] },
  { d:79, path:'79-drumKit', name:'Drum Kit', icon:'🥁', tags:['audio'] },
  { d:80, path:'80-piano', name:'Piano', icon:'🎹', tags:['audio'] },
  { d:81, path:'81-metronome', name:'Metronome', icon:'🎵', tags:['audio','utility'] },
  { d:82, path:'82-toneGenerator', name:'Tone Generator', icon:'〰️', tags:['audio'] },
  { d:83, path:'83-audioVisualizer', name:'Audio Visualizer', icon:'🎚', tags:['audio','visual'] },
  { d:84, path:'84-voiceRecorder', name:'Voice Recorder', icon:'🎙', tags:['audio','tool'] },
  { d:85, path:'85-webcamSnap', name:'Webcam Snapshot', icon:'📸', tags:['tool','visual'] },
  { d:86, path:'86-imageFilters', name:'Image Filters', icon:'🖼', tags:['visual','tool'] },
  { d:87, path:'87-pixelArtMaker', name:'Pixel Art Maker', icon:'👾', tags:['visual','tool'] },
  { d:88, path:'88-kanban', name:'Kanban Board', icon:'📋', tags:['tool','data'] },
  { d:89, path:'89-habitTracker', name:'Habit Tracker', icon:'📅', tags:['tool','data'] },
  { d:90, path:'90-expenseTracker', name:'Expense Tracker', icon:'💰', tags:['tool','data'] },
  { d:91, path:'91-jsonFormatter', name:'JSON Formatter', icon:'{}', tags:['tool','data'] },
  { d:92, path:'92-urlShortenerMock', name:'URL Shortener', icon:'🔗', tags:['tool'] },
  { d:93, path:'93-loremGenerator', name:'Lorem Ipsum', icon:'📃', tags:['tool','utility'] },
  { d:94, path:'94-randomJoke', name:'Random Joke', icon:'😂', tags:['utility'] },
  { d:95, path:'95-baseConverter', name:'Base Converter', icon:'🔢', tags:['tool'] },
  { d:96, path:'96-regexTester', name:'Regex Tester', icon:'/.*/', tags:['tool'] },
  { d:97, path:'97-sudoku', name:'Sudoku', icon:'🧩', tags:['game'] },
  { d:98, path:'98-chessboard', name:'Chessboard', icon:'♟', tags:['game'] },
  { d:99, path:'99-tetris', name:'Tetris', icon:'🧱', tags:['game'] },
  { d:100, path:'100-portfolioShowcase', name:'The Showcase', icon:'🏁', tags:['visual'] }
];

let filter = 'all', query = '';
const grid = document.getElementById('grid');
const empty = document.getElementById('empty');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

function tagCount(tag) {
  if (tag === 'all') return PROJECTS.length;
  return PROJECTS.filter(p => p.tags.includes(tag)).length;
}
document.querySelectorAll('[data-count]').forEach(el => {
  el.textContent = tagCount(el.dataset.count);
});

function render() {
  const q = query.trim().toLowerCase();
  const visible = PROJECTS.filter(p =>
    (filter === 'all' || p.tags.includes(filter)) &&
    (!q || p.name.toLowerCase().includes(q) ||
           p.tags.some(t => t.includes(q)) ||
           String(p.d).padStart(3, '0').includes(q))
  );
  empty.hidden = visible.length > 0;
  grid.innerHTML = visible.map((p, i) => `
    <article class="entry" data-path="${p.path}" data-name="${p.name}" data-day="${p.d}" style="--i:${i}">
      <span class="num">No. ${String(p.d).padStart(3, '0')}</span>
      <span class="icon" aria-hidden="true">${p.icon}</span>
      <h3 class="name">${p.name}</h3>
      <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </article>`).join('');

  grid.querySelectorAll('.entry').forEach(card => {
    card.addEventListener('click', () =>
      openProject(card.dataset.path, card.dataset.day, card.dataset.name));
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}

const viewer = document.getElementById('viewer');
const vframe = document.getElementById('vframe');
const vtitle = document.getElementById('vtitle');
const vlabel = document.getElementById('vlabel');
const vopen = document.getElementById('vopen');

function openProject(path, day, name) {
  const url = path + '/';
  vframe.src = url;
  vtitle.textContent = name;
  vlabel.textContent = 'Day ' + String(day).padStart(3, '0');
  vopen.href = url;
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
}
document.getElementById('vclose').addEventListener('click', () => {
  viewer.hidden = true;
  vframe.src = 'about:blank';
  document.body.style.overflow = '';
});
addEventListener('keydown', e => {
  if (e.key === 'Escape' && !viewer.hidden) {
    document.getElementById('vclose').click();
  }
});

document.getElementById('search').addEventListener('input', e => {
  query = e.target.value; render();
});
document.querySelectorAll('.tabs button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.tabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    filter = b.dataset.tag;
    render();
  });
});

render();
