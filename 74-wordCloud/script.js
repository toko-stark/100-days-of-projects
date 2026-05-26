const STOP = new Set(['the','a','an','and','or','but','is','was','were','be','been','being','have','has','had','do','does','did','will','would','should','could','of','to','in','on','at','for','with','by','from','as','it','this','that','these','those','i','you','he','she','we','they','them','their','his','her','our','my','your','not','no','so','if','than','then']);
function gen() {
  const text = document.getElementById('in').value.toLowerCase();
  const words = text.match(/[a-z]+/g) || [];
  const freq = {};
  for (const w of words) if (!STOP.has(w) && w.length > 2) freq[w] = (freq[w]||0) + 1;
  const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0, 60);
  if (!sorted.length) return;
  const max = sorted[0][1];
  document.getElementById('cloud').innerHTML = sorted.map(([w,n]) =>
    `<span class="word" style="font-size:${0.8 + (n/max)*2.5}rem;color:hsl(${Math.random()*360},70%,65%)">${w}</span>`
  ).join('');
}
document.getElementById('go').onclick = gen; gen();
