'use strict';

console.log('Script is running!');

document.getElementById('calculateBtn').addEventListener('click', (e) => {
  const userDateRaw = String(document.getElementById('birthdate').value);
  const nowDateRaw = new Date();

  if (userDateRaw === '') return;
  if (isNaN(Date.parse(userDateRaw))) return;
  if (Date.parse(userDateRaw) > Date.now()) return;

  const currentDay = {
    year: nowDateRaw.getFullYear(),
    month: nowDateRaw.getMonth(),
    day: nowDateRaw.getDay(),
  };

  const userDate = {
    year: userDateRaw.slice(0, 4),
    month: userDateRaw.slice(5, 7),
    day: userDateRaw.slice(8, 10),
  };

  let ageYears = currentDay.year - userDate.year;
  let ageMonths = currentDay.month - userDate.month;
  let ageDays = currentDay.day - userDate.day;

  const answerYears = document.getElementById('result');
  answerYears.textContent = ageYears + ' years old';

  console.log(currentDay.year, currentDay.month, currentDay.day);
  console.log(userDate.year, userDate.month, userDate.day);
});
