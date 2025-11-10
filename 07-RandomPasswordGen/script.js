'use strict';

const passwordInput = document.querySelector('.password-input');
const btn = document.getElementById('btn');
const lengthInput = document.getElementById('length');

const settings = {
  lowercase: document.getElementById('lowercase')?.checked,
  uppercase: document.getElementById('uppercase')?.checked,
  numbers: document.getElementById('numbers')?.checked,
  symbols: document.getElementById('symbols')?.checked,
};

function getPassword(length, settings) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const number = '0123456789';
  const symbol = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let password = '';
  let passwordChars = '';

  if (settings.lowercase) passwordChars += lower;
  if (settings.uppercase) passwordChars += upper;
  if (settings.numbers) passwordChars += number;
  if (settings.symbols) passwordChars += symbol;

  if (passwordChars === '') {
    return '';
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * passwordChars.length);
      password += passwordChars[randomIndex];
    }
  }
  return password;
}

btn.addEventListener('click', () => {
  const length = +lengthInput.value;

  if (length < 4 || length > 20) {
    alert('Password length must be between 4 and 20 characters, for security.');
    return;
  } else {
    passwordInput.value = getPassword(length, settings);
  }
});

document.querySelectorAll('.checkbox').forEach((checkbox) => {
  checkbox.addEventListener('change', (e) => {
    settings[e.target.id] = e.target.checked;
  });
});
