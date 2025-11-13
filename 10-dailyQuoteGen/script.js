const quote = document.getElementById('quote');
const btn = document.getElementById('btn');

const apiUrl = 'https://quoteslate.vercel.app/api/quotes/random';

async function getNewQuote(url = apiUrl) {
  const response = await fetch(url);
  const data = await response.json();
  quote.innerHTML = `"${data.quote}" - ${data.author}`;
}

btn.addEventListener('click', () => {
  getNewQuote();
});

getNewQuote();
