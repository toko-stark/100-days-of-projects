const WORDS = ['javascript','keyboard','elephant','sunshine','adventure','mountain','programming','umbrella','horizon','treasure','butterfly','quantum','synthesis','algorithm','telescope'];
let word, score = 0;
function shuffle(s) { return s.split('').sort(() => Math.random()-.5).join(''); }
function newW() {
  word = WORDS[Math.floor(Math.random()*WORDS.length)];
  let sc;
  do { sc = shuffle(word); } while (sc === word);
  document.getElementById('scram').textContent = sc;
  document.getElementById('g').value = '';
  document.getElementById('msg').textContent = '';
}
document.getElementById('check').onclick = () => {
  const m = document.getElementById('msg');
  if (document.getElementById('g').value.toLowerCase() === word) {
    score++; m.textContent = '✓ Correct!'; m.className = 'ok';
    document.getElementById('s').textContent = score;
    setTimeout(newW, 600);
  } else { m.textContent = '✗ Try again'; m.className = 'bad'; }
};
document.getElementById('new').onclick = newW;
document.getElementById('hint').onclick = () => document.getElementById('msg').textContent = 'Starts with: ' + word[0];
newW();
