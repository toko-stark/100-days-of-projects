const API = 'https://www.themealdb.com/api/json/v1/1';

async function search() {
  const q = document.getElementById('q').value.trim();
  document.getElementById('detail').innerHTML = '';
  const r = await fetch(`${API}/search.php?s=${encodeURIComponent(q)}`);
  const d = await r.json();
  const grid = document.getElementById('grid');
  if (!d.meals) { grid.innerHTML = '<p>No recipes found.</p>'; return; }
  grid.innerHTML = d.meals.slice(0, 12).map(m =>
    `<div class="card" data-id="${m.idMeal}">
       <img src="${m.strMealThumb}" alt="${m.strMeal}">
       <h3>${m.strMeal}</h3>
     </div>`).join('');
  grid.querySelectorAll('.card').forEach(c => c.onclick = () => detail(c.dataset.id));
}
async function detail(id) {
  const r = await fetch(`${API}/lookup.php?i=${id}`);
  const m = (await r.json()).meals[0];
  const ings = [];
  for (let i = 1; i <= 20; i++) {
    const x = m['strIngredient' + i], y = m['strMeasure' + i];
    if (x && x.trim()) ings.push(`${y} ${x}`);
  }
  document.getElementById('detail').innerHTML = `
    <h2>${m.strMeal}</h2>
    <img src="${m.strMealThumb}">
    <p><b>Category:</b> ${m.strCategory} | <b>Area:</b> ${m.strArea}</p>
    <h3>Ingredients</h3><ul>${ings.map(i=>`<li>${i}</li>`).join('')}</ul>
    <h3>Instructions</h3><p>${m.strInstructions}</p>
    <div style="clear:both"></div>`;
}
document.getElementById('go').onclick = search;
document.getElementById('q').onkeydown = e => { if (e.key === 'Enter') search(); };
document.getElementById('q').value = 'pasta'; search();
