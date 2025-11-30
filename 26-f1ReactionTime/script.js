(() => {
  const box = document.getElementById('box');
  const message = document.getElementById('message');
  const btnStart = document.getElementById('start');
  const btnReset = document.getElementById('reset');

  const elBest = document.getElementById('best');
  const elLast = document.getElementById('last');
  const elAvg = document.getElementById('avg');

  let state = 'idle';
  let timerId = null;
  let goTimestamp = 0;

  const STORAGE_KEY = 'f1-reaction-stats';
  const stats = loadStats();

  updateStatsUI();

  function loadStats() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { times: [] };
    } catch {
      return { times: [] };
    }
  }

  function saveStats() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }

  function ms(num) {
    return `${Math.round(num)} ms`;
  }

  function calcAvg(arr) {
    if (!arr.length) return null;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
  }

  function updateStatsUI() {
    const times = stats.times;
    const best = times.length ? Math.min(...times) : null;
    const last = times.length ? times[times.length - 1] : null;
    const avg = calcAvg(times);

    elBest.textContent = best != null ? ms(best) : '—';
    elLast.textContent = last != null ? ms(last) : '—';
    elAvg.textContent = avg != null ? ms(avg) : '—';
  }

  function setBoxState(cls, text) {
    box.classList.remove('ready', 'go', 'early');
    if (cls) box.classList.add(cls);
    if (text != null) message.textContent = text;
  }

  function clearPending() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  }

  function startRound() {
    if (state === 'waiting' || state === 'go') return;

    clearPending();
    state = 'waiting';
    goTimestamp = 0;

    setBoxState('ready', 'Get ready… wait for green');

    const delay = 1200 + Math.random() * 1800;
    timerId = setTimeout(() => {
      timerId = null;
      state = 'go';
      goTimestamp = performance.now();
      setBoxState('go', 'GO! Click now!');
    }, delay);
  }

  function registerReaction() {
    if (state === 'waiting') {
      clearPending();
      state = 'idle';
      setBoxState('early', 'False start! Wait for green.');
      setTimeout(() => setBoxState('ready', 'Click Start to try again'), 700);
      return;
    }

    if (state === 'go') {
      const now = performance.now();
      const rt = now - goTimestamp;
      stats.times.push(rt);
      saveStats();
      updateStatsUI();

      state = 'idle';
      setBoxState('ready', `Reaction: ${ms(rt)}. Click Start to try again`);
      return;
    }
  }

  function resetStats() {
    stats.times = [];
    saveStats();
    updateStatsUI();
    setBoxState('ready', 'Stats reset. Click Start to try again');
  }

  box.addEventListener('click', registerReaction);
  btnStart?.addEventListener('click', startRound);
  btnReset?.addEventListener('click', resetStats);

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (state === 'idle') startRound();
      else registerReaction();
    }
  });

  setBoxState('ready', 'Click Start to begin. Wait for green, then click.');
})();
