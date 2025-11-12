const btn = document.getElementById('speakButton');
const text = document.getElementById('text');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  btn.disabled = true;
  setTimeout(() => {
    btn.disabled = false;
  }, 1000);

  const textValue = text.value;

  if (!textValue) {
    alert('Please fill out correctly before trying to convert!');
    return;
  }

  const speech = new SpeechSynthesisUtterance(textValue);
  speech.lang = 'en-US';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
  return;
});
