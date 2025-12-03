const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  const reqDate = document.getElementById('date').value;
  const curDate = new Date();

  if (!reqDate) {
    alert('Please select a date.');
    return;
  } else {
    const selectedDate = new Date(reqDate);
    if (selectedDate < curDate) {
      alert('The selected date is not in the future.');
    } else {
      const elements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
      };
      const diff = selectedDate - curDate;
      const totalSeconds = Math.floor(diff / 1000);

      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      elements.days.textContent = days;
      elements.hours.textContent = hours;
      elements.minutes.textContent = minutes;
      elements.seconds.textContent = seconds;
    }
  }
});
