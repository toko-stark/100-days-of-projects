const c = document.getElementById('c'), ctx = c.getContext('2d');
document.getElementById('start').onclick = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const ac = new (window.AudioContext||window.webkitAudioContext)();
  const src = ac.createMediaStreamSource(stream);
  const an = ac.createAnalyser(); an.fftSize = 256;
  src.connect(an);
  const data = new Uint8Array(an.frequencyBinCount);
  function loop() {
    an.getByteFrequencyData(data);
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,c.width,c.height);
    const bw = c.width / data.length;
    for (let i = 0; i < data.length; i++) {
      const h = (data[i] / 255) * c.height;
      ctx.fillStyle = `hsl(${i*2},80%,55%)`;
      ctx.fillRect(i*bw, c.height-h, bw-1, h);
    }
    requestAnimationFrame(loop);
  }
  loop();
};
