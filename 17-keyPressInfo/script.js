document.querySelector('body').addEventListener('keydown', function (e) {
  e.preventDefault();

  if (!e.code) return;

  document
    .querySelectorAll('hidden')
    .forEach((el) => el.removeAttribute('hidden'));

  const info = {
    key: e.key,
    code: e.code,
    keyCode: e.keyCode,
  };

  const keyName = document.querySelector('.keyName');
  const codeName = document.querySelector('.code');
  const keyCode = document.querySelector('.keyCode');

  keyName.textContent = info.key;
  keyCode.textContent = info.code;
  codeName.textContent = info.keyCode;
});
