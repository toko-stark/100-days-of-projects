const btn = document.querySelector('.login-button');

btn.addEventListener('mouseover', (e) => {
  const emailInput = document.querySelector('#email-input');
  const passwordInput = document.querySelector('#password-input');

  if (emailInput.value !== '' || passwordInput.value !== '') {
    return;
  }

  const classes = ['top', 'right', 'bottom', 'left'];

  setTimeout(() => {
    btn.classList.remove(...classes);
  }, 3000);

  if (btn.classList.contains('top')) {
    btn.classList.remove('top');
    btn.classList.add('right');
  } else if (btn.classList.contains('right')) {
    btn.classList.remove('right');
    btn.classList.add('bottom');
  } else if (btn.classList.contains('bottom')) {
    btn.classList.remove('bottom');
    btn.classList.add('left');
  } else if (btn.classList.contains('left')) {
    btn.classList.remove('left');
    btn.classList.add('top');
  } else {
    btn.classList.add('top');
  }

  console.log('Mouse over event detected on login button');
});

btn.addEventListener('click', (e) => {
  const emailInput = document.querySelector('#email-input');
  const passwordInput = document.querySelector('#password-input');

  if (emailInput.value === '' || passwordInput.value === '') {
    e.preventDefault();
    alert('Please fill in both email and password fields before logging in.');
  } else {
    alert('Login successful!');
  }
});
