let links = JSON.parse(localStorage.getItem('urls92') || '[]');
const save = () => localStorage.setItem('urls92', JSON.stringify(links));
const rnd = () => Math.random().toString(36).slice(2, 8);
function render() {
  document.getElementById('list').innerHTML = links.map((l, i) => `
    <li>
      <div class="short" data-i="${i}">short.ly/${l.code}</div>
      <div class="long">${l.url}</div>
      <div class="hits">Hits: ${l.hits}</div>
    </li>`).join('') || '<li>No links yet.</li>';
  document.querySelectorAll('.short').forEach(el => el.onclick = () => {
    const l = links[+el.dataset.i];
    l.hits++; save(); render();
    window.open(l.url, '_blank');
  });
}
document.getElementById('go').onclick = () => {
  let url = document.getElementById('url').value.trim();
  if (!url) return;
  if (!/^https?:\/\//.test(url)) url = 'https://' + url;
  links.unshift({ url, code: rnd(), hits: 0 });
  document.getElementById('url').value = '';
  save(); render();
};
render();
