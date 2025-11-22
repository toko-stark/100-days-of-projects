let i = 0;

setInterval(() => {
  const lights = document.querySelectorAll('.light')[i];

  document
    .querySelectorAll('.light')
    .forEach((cur) => cur.classList.remove('active'));

  if (i === 2) {
    i = 0;
  } else {
    ++i;
  }

  lights.classList.add('active');

  console.log(lights);
}, 1000);
