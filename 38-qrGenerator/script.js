function gen() {
  const t = encodeURIComponent(document.getElementById('txt').value);
  const s = document.getElementById('sz').value;
  document.getElementById('qr').innerHTML =
    `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${s}x${s}&data=${t}" alt="qr">`;
}
document.getElementById('gen').onclick = gen;
gen();
