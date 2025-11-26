const songBtns = document.querySelectorAll('.song-btn');
const songs = document.querySelectorAll('.song');
songBtns.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    document.querySelector('.song-btn.active').classList.remove('active');
    btn.classList.add('active');
    document.querySelector('.song.active').classList.remove('active');
    songs[i].classList.add('active');
  });
});
