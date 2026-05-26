let rec = null, chunks = [], iv = null, sec = 0;
const btn = document.getElementById('rec');
const fmt = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;

btn.onclick = async () => {
  if (rec) {
    rec.stop();
    clearInterval(iv); sec = 0;
    document.getElementById('time').textContent = '00:00';
    btn.textContent = '● Record'; btn.classList.remove('rec');
    rec = null; return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  rec = new MediaRecorder(stream);
  chunks = [];
  rec.ondataavailable = e => chunks.push(e.data);
  rec.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);
    const li = document.createElement('li');
    li.innerHTML = `<audio controls src="${url}"></audio><a href="${url}" download="rec.webm">⬇</a>`;
    document.getElementById('list').prepend(li);
    stream.getTracks().forEach(t => t.stop());
  };
  rec.start();
  iv = setInterval(() => { sec++; document.getElementById('time').textContent = fmt(sec); }, 1000);
  btn.textContent = '■ Stop'; btn.classList.add('rec');
};
