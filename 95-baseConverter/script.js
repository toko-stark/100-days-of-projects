const inputs = document.querySelectorAll('input[data-base]');
function sync(src) {
  const base = +src.dataset.base;
  const n = parseInt(src.value, base);
  inputs.forEach(i => {
    if (i === src) return;
    i.value = isNaN(n) ? '' : n.toString(+i.dataset.base).toUpperCase();
  });
}
inputs.forEach(i => i.oninput = () => sync(i));
sync(document.querySelector('[data-base="10"]'));
