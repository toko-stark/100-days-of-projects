const heightInput = document.getElementById('height-input');
const weightInput = document.getElementById('weight-input');
const submitBtn = document.querySelector('.form-button');

const resultInput = document.getElementById('bmi-input');
const resultClass = document.querySelector('.result--class');

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();

  if (heightInput.value > 0 && weightInput.value > 0) {
    const bmi = weightInput.value / (heightInput.value / 100) ** 2;
    resultInput.value = bmi;

    // prettier-ignore
    let bmiClass =bmi < 18.5? 'Under Weight': bmi < 24.9? 'Normal Weight': 'Over Weight';

    resultClass.textContent = bmiClass;
  }
});
