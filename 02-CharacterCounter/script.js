const textarea = document.getElementById('text-input');
const totalCharacter = document.querySelector('.total-characters');
const remainingCharacters = document.querySelector('.remaining-characters');

totalCharacter.textContent = 0;
remainingCharacters.textContent = 50;

textarea.addEventListener('keydown', () => {
  const textValue = textarea.value;

  if (textValue !== '') {
    let arr = textValue.split('');

    if (arr.length >= 50) {
      textarea.disabled = true;
      arr.splice(50);
    }

    totalCharacter.textContent = arr.length;
    remainingCharacters.textContent = 50 - arr.length;
  }
});

document.querySelector('.btn-reset').addEventListener('click', () => {
  location.reload();
});
