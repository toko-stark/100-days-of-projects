// Register inputs
const registerInputName = document.getElementById('register--input-name');
const registerInputPassword = document.getElementById(
  'register--input-password'
);
const registerInputEmail = document.getElementById('register--input-email');

// Login inputs
const loginInputUser = document.getElementById('login--input-user');
const loginInputPassword = document.getElementById('login--input-password');

// Buttons
const signUpButton = document.getElementById('sign-up');
const signInButton = document.getElementById('sign-in');

async function callBackend(login_register_type = 'login', object) {
  if (Object.values(object).some((value) => !value)) {
    alert('Form was not filled out correctly');
    return null;
  }

  try {
    const res = await fetch(
      `http://localhost:3000/api/${login_register_type}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(object),
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      alert(errData.message || 'Something went wrong');
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    alert('Unable to reach server');
    return null;
  }
}

// Event listeners
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault();

    if (e.target.id === 'sign-up') {
      const inputRegister = {
        username: registerInputName.value,
        password: registerInputPassword.value,
        email: registerInputEmail.value,
      };

      const data = await callBackend('register', inputRegister);
      if (data?.success) {
        alert('Register was successful');
        registerInputName.value = '';
        registerInputEmail.value = '';
        registerInputPassword.value = '';
      }
    } else if (e.target.id === 'sign-in') {
      const inputLogin = {
        user: loginInputUser.value,
        password: loginInputPassword.value,
      };

      const data = await callBackend('login', inputLogin);
      if (data?.success) {
        alert('Login was successful');
        loginInputUser.value = '';
        loginInputPassword.value = '';
      }
    } else {
      console.log('No action found for button');
    }
  });
});
