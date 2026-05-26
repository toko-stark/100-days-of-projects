const Q = [
  { q: 'What is the capital of Australia?', a: ['Sydney','Melbourne','Canberra','Perth'], c: 2 },
  { q: 'Which language runs in a web browser?', a: ['Java','C','Python','JavaScript'], c: 3 },
  { q: 'What year did WWII end?', a: ['1942','1945','1948','1950'], c: 1 },
  { q: 'How many continents are there?', a: ['5','6','7','8'], c: 2 },
  { q: 'What planet is known as the Red Planet?', a: ['Venus','Mars','Jupiter','Saturn'], c: 1 },
  { q: 'Largest ocean?', a: ['Atlantic','Indian','Arctic','Pacific'], c: 3 },
  { q: 'Who wrote "Hamlet"?', a: ['Dickens','Shakespeare','Tolkien','Austen'], c: 1 },
  { q: 'Chemical symbol for gold?', a: ['Go','Gd','Au','Ag'], c: 2 }
];
let i = 0, score = 0;
function show() {
  if (i >= Q.length) {
    document.getElementById('q').textContent = '🏆 Done!';
    document.getElementById('opts').innerHTML = '';
    document.getElementById('prog').textContent = `Score: ${score} / ${Q.length}`;
    return;
  }
  const x = Q[i];
  document.getElementById('q').textContent = x.q;
  const o = document.getElementById('opts');
  o.innerHTML = '';
  x.a.forEach((t, idx) => {
    const b = document.createElement('button'); b.className = 'opt'; b.textContent = t;
    b.onclick = () => {
      [...o.children].forEach((el,j) => { el.classList.add(j===x.c?'ok':'bad'); el.disabled=true; });
      if (idx === x.c) score++;
      setTimeout(() => { i++; show(); }, 800);
    };
    o.appendChild(b);
  });
  document.getElementById('prog').textContent = `Question ${i+1} / ${Q.length} — Score: ${score}`;
}
show();
