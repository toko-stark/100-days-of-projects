async function joke() {
  document.getElementById('setup').textContent = '...';
  document.getElementById('punch').textContent = '';
  try {
    const r = await fetch('https://official-joke-api.appspot.com/random_joke');
    const j = await r.json();
    document.getElementById('setup').textContent = j.setup;
    setTimeout(() => document.getElementById('punch').textContent = j.punchline, 1200);
  } catch (e) {
    document.getElementById('setup').textContent = "Why don't scientists trust atoms?";
    document.getElementById('punch').textContent = 'Because they make up everything.';
  }
}
document.getElementById('go').onclick = joke; joke();
