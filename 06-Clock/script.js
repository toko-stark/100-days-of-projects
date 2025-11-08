'use strict';

const hourTxt = document.getElementById('hours');
const minTxt = document.getElementById('minutes');
const secTxt = document.getElementById('seconds');

const ampmTxt = document.getElementById('ampm');
const curDate = document.getElementById('date');
const formatToggle = document.getElementById('formatToggle');

function updateClock(date) {
  const now = new Date();

  // UPDATE CUR DATE
  const monthsRaw = ['January','February','March','April','May','June','July','August','September','October','November','December'] // prettier-ignore
  curDate.textContent = `${now.getDay()}, ${monthsRaw[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`; // prettier-ignore

  // UPDATE CLOCK if 24-hour

  hourTxt.textContent = formatToggle.checked ? String(now.getHours()).padStart(2, '0') : String(now.getHours() % 12 || 12).padStart(2, '0'); // prettier-ignore
  minTxt.textContent = String(now.getMinutes()).padStart(2, '0');
  secTxt.textContent = String(now.getSeconds()).padStart(2, '0');
  ampmTxt.textContent = formatToggle.checked ? '' :  (now.getHours() >12 ? 'PM' : 'AM') // prettier-ignore
}

setInterval(updateClock, 100);
