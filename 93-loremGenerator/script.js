const W = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');
const word = () => W[Math.floor(Math.random()*W.length)];
const sentence = () => {
  const n = 6 + Math.floor(Math.random()*10);
  let s = Array(n).fill(0).map(word).join(' ');
  return s[0].toUpperCase() + s.slice(1) + '.';
};
function gen() {
  const np = +document.getElementById('n').value, ns = +document.getElementById('s').value;
  const out = [];
  for (let i = 0; i < np; i++) out.push('<p>' + Array(ns).fill(0).map(sentence).join(' ') + '</p>');
  document.getElementById('out').innerHTML = out.join('');
}
document.getElementById('go').onclick = gen;
document.getElementById('copy').onclick = () => navigator.clipboard.writeText(document.getElementById('out').innerText);
gen();
