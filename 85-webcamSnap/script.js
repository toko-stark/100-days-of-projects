const v = document.getElementById('v');
document.getElementById('start').onclick = async () => {
  v.srcObject = await navigator.mediaDevices.getUserMedia({ video: true });
};
document.getElementById('snap').onclick = () => {
  if (!v.srcObject) return;
  const c = document.createElement('canvas');
  c.width = v.videoWidth; c.height = v.videoHeight;
  c.getContext('2d').drawImage(v, 0, 0);
  const url = c.toDataURL('image/png');
  const a = document.createElement('a'); a.href = url; a.download = 'snap.png';
  const img = document.createElement('img'); img.src = url; img.onclick = () => a.click();
  document.getElementById('gallery').prepend(img);
};
