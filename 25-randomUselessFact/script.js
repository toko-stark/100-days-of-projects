const baseURL = 'https://uselessfacts.jsph.pl/random.json?language=en';

const factEl = document.querySelector('.fact');

async function getFact() {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    factEl.textContent = data.text;
  } catch (error) {
    factEl.textContent = 'Failed to fetch a fact. Please try again later.';
    console.error('Error fetching fact:', error);
  }
}

getFact();

document.querySelector('.new-fact-btn').addEventListener('click', getFact);
