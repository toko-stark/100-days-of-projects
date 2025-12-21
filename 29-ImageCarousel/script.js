const btnPrev = document.getElementById('prevBtn');
const btnNext = document.getElementById('nextBtn');
const imageContainer = document.getElementById('imageContainer');
const images = document.querySelectorAll('.carousel-image');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 100;
  imageContainer.style.transform = `translateX(${offset}%)`;
}

btnPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateCarousel();
});

btnNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
});

updateCarousel();
